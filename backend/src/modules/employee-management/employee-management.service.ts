import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { EScheduleCode } from '../../shared/enums/enums';

import { Employee } from '../employee/entities/employee.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeesDto } from './dto/create-employees.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';

import {
  IAccountInfo,
  IEmployeeInfo,
  IList,
  IProfile,
} from '../../shared/interfaces/api.interface';

import { AssignmentRepository } from '../assignment/assignment.repository';
import { EmployeeRepository } from '../employee/employee.repository';

import { AccountService } from '../account/account.service';
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
    private readonly employeeService: EmployeeService,
    private readonly accountService: AccountService,
    private readonly professionService: ProfessionService,
    private readonly scheduleService: ScheduleService,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  async createEmployee(
    dto: CreateEmployeeDto,
    profile?: IProfile,
    isManyOperation: boolean = false,
  ): Promise<IAccountInfo> {
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

    // Проверяем, не занято ли ФИО
    await this.employeeService.validateUniqueFullName(
      dto.lastName,
      dto.firstName,
      dto.patronymic,
    );

    // Проверяем уникальность личного номера
    // await this.employeeService.validateUniquePersonalNumber(dto.personalNumber);

    // Проверяем условие - руководитель в бригаде может быть только один
    // if (this.isManagerRole(position.role.name as ERole)) {
    //   await this.employeeService.existsTeamManager(
    //     team.id,
    //     position.workshop.id,
    //     position.schedule.id,
    //     position.role.id,
    //   );
    // }

    // Создаем аккаунт
    const { account, initialPassword } =
      await this.accountService.createAсcount(
        dto.lastName,
        dto.firstName,
        dto.patronymic,
      );

    // Создаём сотрудника
    const employee = await this.employeeRepository.create({
      lastName: dto.lastName,
      firstName: dto.firstName,
      patronymic: dto.patronymic,
      personalNumber: dto.personalNumber,
      account: account,
      homeWorkshop: workshop,
      homeTeam: team,
      homeProfession: profession,
      homeSchedule: schedule,
    });

    // Создаем первое (и пока единственное) активное назначение
    await this.assignmentRepository.create({
      isActive: true,
      employee: employee,
      currentWorkshop: workshop,
      currentTeam: team,
      currentProfession: profession,
      currentSchedule: schedule,
    });

    return {
      lastName: dto.lastName,
      firstName: dto.firstName,
      patronymic: dto.patronymic,
      login: account.login,
      password: initialPassword,
    };
  }

  async createMany(dtos: CreateEmployeesDto): Promise<IList<IAccountInfo>> {
    try {
      const employees = await Promise.all(
        dtos.employees.map((dto) => this.createEmployee(dto, undefined, true)),
      );

      return {
        total: employees.length,
        items: employees,
      };
    } catch (error) {
      console.error('createMany failed:', error);

      throw new InternalServerErrorException('Не удалось создать работников');
    }
  }

  // async updateEmployee(
  //   dto: UpdateEmployeeDto,
  //   profile: IProfile,
  // ): Promise<IEmployeeInfo> {
  //   const { employeeId } = profile;

  //   // Получаем сущности
  //   const employee = await this.employeeService.getEmployee(dto.id);
  //   const team = await this.teamService.getTeam(dto.teamNumber);
  //   const position = await this.getEmployeePosition(dto.positionCode);
  //   const profileTeam = await this.teamService.getTeam(dto.profileTeamNumber);
  //   const profilePosition = await this.getEmployeePosition(
  //     dto.profilePositionCode,
  //   );

  //   // Проверяем условия - cотрудник не может редактировать собственные данные
  //   if (employeeId === employee.id) {
  //     throw new ConflictException('Нельзя редактировать себя');
  //   }

  //   // Проверяем соответствие бригады и графика по штатной позиции (КЛС)
  //   await this.validateTeamScheduleCompatibility(
  //     dto.teamNumber,
  //     dto.positionCode,
  //   );

  //   // Проверяем соответствие бригады и графика по штатной позиции (profile-поля)
  //   await this.validateTeamScheduleCompatibility(
  //     dto.profileTeamNumber,
  //     dto.profilePositionCode,
  //   );

  //   // Проверяем условие - руководитель в бригаде может быть только один
  //   if (this.isManagerRole(profilePosition.role.name as ERole)) {
  //     await this.employeeService.existsTeamManagerExcluding(
  //       employee.id,
  //       profileTeam.id,
  //       profilePosition.workshop.id,
  //       profilePosition.schedule.id,
  //       profilePosition.role.id,
  //     );
  //   }

  //   // Обновление полей
  //   employee.hasAccess = dto.hasAccess;

  //   // Обновление связей
  //   employee.team = team;
  //   employee.position = position;
  //   employee.profileTeam = profileTeam;
  //   employee.profilePosition = profilePosition;

  //   // Сохранение изменений
  //   await this.employeeRepository.save(employee);

  //   // Возврат результата
  //   return this.getEmployeeInfo(employee.personalNumber);
  // }

  async getEmployeeInfo(personalNumber: number): Promise<IEmployeeInfo> {
    const employee =
      await this.employeeService.getEmployeeByPersonalNumber(personalNumber);

    const current = employee.assignments.find((a) => a.isActive);

    return {
      id: employee.id,
      lastName: employee.lastName,
      firstName: employee.firstName,
      patronymic: employee.patronymic,
      personalNumber: employee.personalNumber,

      isActive: current.isActive,

      currentWorkshopCode: current.currentWorkshop.workshopCode,
      currentWorkshopName: current.currentWorkshop.name,
      currentTeamNumber: current.currentTeam.teamNumber,
      currentProfessionCode: current.currentProfession.professionCode,
      currentProfessionName: current.currentProfession.name,
      currentScheduleCode: current.currentSchedule.scheduleCode,
      currentScheduleName: current.currentSchedule.name,

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

  // private async getEmployeePosition(positionCode: number): Promise<Position> {
  //   const position = await this.positionService.getPosition(positionCode);

  //   return position;
  // }

  // private isManagerRole(role: ERole): boolean {
  //   return [
  //     ERole.HEAD,
  //     ERole.LEAD_MASTER,
  //     ERole.DETAIL_MASTER,
  //     ERole.MASTER,
  //   ].includes(role);
  // }

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
