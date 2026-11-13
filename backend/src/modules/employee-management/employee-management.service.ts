import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { EProfessionCode, EScheduleCode } from '../../shared/enums/enums';

import { Employee } from '../employee/entities/employee.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import {
  IAccountInfo,
  IEmployeeInfo,
  IList,
  IProfile,
  ISuccess,
} from '../../shared/interfaces/api.interface';

import { AssignmentRepository } from '../assignment/assignment.repository';
import { EmployeeRepository } from '../employee/employee.repository';

import { AccountService } from '../account/account.service';
import { AssignmentService } from '../assignment/assignment.service';
import { EmployeeService } from '../employee/employee.service';
import { ProfessionService } from '../profession/profession.service';
import { ScheduleService } from '../schedule/schedule.service';
import { TeamService } from '../team/team.service';
import { WorkshopService } from '../workshop/workshop.service';

@Injectable()
export class EmployeeManagementService {
  constructor(
    private readonly assignmentRepository: AssignmentRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly accountService: AccountService,
    private readonly assignmentService: AssignmentService,
    private readonly employeeService: EmployeeService,
    private readonly professionService: ProfessionService,
    private readonly scheduleService: ScheduleService,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  async createEmployee(dto: CreateEmployeeDto): Promise<IAccountInfo> {
    // Получаем сущности нового сотрудника
    const [workshop, team, profession, schedule] = await Promise.all([
      this.workshopService.getWorkshopByCode(dto.workshopCode),
      this.teamService.getTeamByNumber(dto.teamNumber),
      this.professionService.getProfessionByCode(dto.professionCode),
      this.scheduleService.getScheduleByCode(dto.scheduleCode),
    ]);

    // Проверяем соответствие бригады и графика по штатной позиции (КЛС)
    await this.validateTeamScheduleCompatibility(
      dto.teamNumber,
      dto.scheduleCode,
    );

    // Проверяем уникальность ФИО
    await this.employeeService.validateUniqueFullName(
      dto.lastName,
      dto.firstName,
      dto.patronymic,
    );

    // Проверяем уникальность личного номера
    await this.employeeService.validateUniquePersonalNumber(dto.personalNumber);

    // Проверяем условие - руководитель в бригаде может быть только один
    if (this.isManagerProfessionCode(dto.professionCode as EProfessionCode)) {
      await this.employeeService.existsTeamManager(
        workshop.id,
        team.id,
        profession.id,
        schedule.id,
      );
    }

    // Создаем аккаунт
    const { account, initialPassword } =
      await this.accountService.createAсcount(
        dto.lastName,
        dto.firstName,
        dto.patronymic,
      );

    // Создаем назначение
    const assignment = await this.assignmentRepository.create({
      isActive: true,
      currentWorkshop: workshop,
      currentTeam: team,
      currentProfession: profession,
      currentSchedule: schedule,
    });

    // Создаём сотрудника
    const employee = await this.employeeRepository.create({
      lastName: dto.lastName,
      firstName: dto.firstName,
      patronymic: dto.patronymic,
      personalNumber: dto.personalNumber,
      account,
      assignment,
      homeWorkshop: workshop,
      homeTeam: team,
      homeProfession: profession,
      homeSchedule: schedule,
    });

    return {
      lastName: dto.lastName,
      firstName: dto.firstName,
      patronymic: dto.patronymic,
      login: account.login,
      password: initialPassword,
    };
  }

  async updateEmployee(
    dto: UpdateEmployeeDto,
    profile: IProfile,
  ): Promise<IEmployeeInfo> {
    const { employeeId } = profile;

    // Получаем сущности
    const [
      employee,
      currentWorkshop,
      currentTeam,
      currentProfession,
      currentSchedule,
      homeWorkshop,
      homeTeam,
      homeProfession,
      homeSchedule,
    ] = await Promise.all([
      this.employeeService.getEmployeeById(dto.id),
      this.workshopService.getWorkshopByCode(dto.currentWorkshopCode),
      this.teamService.getTeamByNumber(dto.currentTeamNumber),
      this.professionService.getProfessionByCode(dto.currentProfessionCode),
      this.scheduleService.getScheduleByCode(dto.currentScheduleCode),
      this.workshopService.getWorkshopByCode(dto.homeWorkshopCode),
      this.teamService.getTeamByNumber(dto.homeTeamNumber),
      this.professionService.getProfessionByCode(dto.homeProfessionCode),
      this.scheduleService.getScheduleByCode(dto.homeScheduleCode),
    ]);

    // Проверяем условия - cотрудник не может редактировать собственные данные
    if (employeeId === employee.id) {
      throw new ConflictException('Нельзя редактировать себя');
    }

    // Проверяем соответствие бригады и графика (current-поля)
    await this.validateTeamScheduleCompatibility(
      dto.currentTeamNumber,
      dto.currentScheduleCode,
    );

    // Проверяем соответствие бригады и графика (КЛС)
    await this.validateTeamScheduleCompatibility(
      dto.homeTeamNumber,
      dto.homeScheduleCode,
    );

    // Проверяем условие - руководитель в бригаде может быть только один
    if (
      this.isManagerProfessionCode(dto.currentProfessionCode as EProfessionCode)
    ) {
      await this.employeeService.existsTeamManagerExcluding(
        employee.id,
        currentWorkshop.id,
        currentTeam.id,
        currentProfession.id,
        currentSchedule.id,
      );
    }

    // Обновление связей
    employee.homeWorkshop = homeWorkshop;
    employee.homeTeam = homeTeam;
    employee.homeProfession = homeProfession;
    employee.homeSchedule = homeSchedule;

    // Сохранение изменений сотрудника
    await this.employeeRepository.save(employee);

    // Сохранение изменений назначения
    await this.assignmentService.updateByEmployee(
      employee.id,
      currentWorkshop,
      currentTeam,
      currentProfession,
      currentSchedule,
      dto.hasAccess,
    );

    // Возврат результата
    return this.getEmployeeInfo(employee.personalNumber);
  }

  async getEmployeeInfo(personalNumber: number): Promise<IEmployeeInfo> {
    const employee =
      await this.employeeService.getEmployeeByPersonalNumber(personalNumber);

    const assignment = employee.assignment;

    return {
      id: employee.id,
      lastName: employee.lastName,
      firstName: employee.firstName,
      patronymic: employee.patronymic,
      personalNumber: employee.personalNumber,

      hasAccess: assignment.isActive,

      currentWorkshopCode: assignment.currentWorkshop.workshopCode,
      currentWorkshopName: assignment.currentWorkshop.name,
      currentTeamNumber: assignment.currentTeam.teamNumber,
      currentProfessionCode: assignment.currentProfession.professionCode,
      currentProfessionName: assignment.currentProfession.name,
      currentScheduleCode: assignment.currentSchedule.scheduleCode,
      currentScheduleName: assignment.currentSchedule.name,

      homeWorkshopCode: employee.homeWorkshop.workshopCode,
      homeWorkshopName: employee.homeWorkshop.name,
      homeTeamNumber: employee.homeTeam.teamNumber,
      homeProfessionCode: employee.homeProfession.professionCode,
      homeProfessionName: employee.homeProfession.name,
      homeScheduleCode: employee.homeSchedule.scheduleCode,
      homeScheduleName: employee.homeSchedule.name,
    };
  }

  // async getEmployeesForSchedule(
  //   workshopCode: string,
  //   teamNumber: number,
  //   scheduleCode: string,
  // ): Promise<Employee[]> {
  //   if (scheduleCode === ESchedule.S_2A && workshopCode === EWorkshop.W_LPC11) {
  //     const [employees2A, employees2] = await Promise.all([
  //       this.employeeService.getTeamEmployees(
  //         teamNumber,
  //         workshopCode,
  //         scheduleCode,
  //       ),
  //       this.employeeService.getTeamEmployees(
  //         teamNumber,
  //         workshopCode,
  //         ESchedule.S_2,
  //       ),
  //     ]);

  //     return [...employees2A, ...employees2];
  //   }

  //   return this.employeeService.getTeamEmployees(
  //     teamNumber,
  //     workshopCode,
  //     scheduleCode,
  //   );
  // }

  async deleteEmployee(id: string, profile: IProfile): Promise<ISuccess> {
    const { employeeId } = profile;
    const employee = await this.employeeService.getEmployeeById(id);

    // Проверяем условия - cотрудник не может редактировать собственные данные
    if (employeeId === employee.id) {
      throw new ConflictException('Нельзя редактировать себя');
    }

    const result = await this.employeeRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Работник не найден');
    }

    return {
      message: 'Работник удален успешно',
    };
  }

  private isManagerProfessionCode(code: EProfessionCode): boolean {
    return [
      EProfessionCode.HEAD,
      EProfessionCode.LEAD_MASTER,
      EProfessionCode.DETAIL_MASTER,
      EProfessionCode.MASTER,
    ].includes(code);
  }

  private SCHEDULE_TEAM_RULES: Record<string, number[]> = {
    [EScheduleCode.S_5B1]: [5],
    [EScheduleCode.S_2]: [1, 2, 3, 4],
    [EScheduleCode.S_2A]: [1, 2, 3, 4],
    [EScheduleCode.S_9]: [1, 2],
  };

  private async validateTeamScheduleCompatibility(
    teamNumber: number,
    scheduleCode: string,
  ): Promise<void> {
    // Получаем допустимые бригады для графика
    const allowedTeams = this.SCHEDULE_TEAM_RULES[scheduleCode];

    // Проверяем, входит ли бригада в список допустимых
    if (!allowedTeams.includes(teamNumber)) {
      throw new ConflictException('График не соответствует бригаде');
    }
  }
}
