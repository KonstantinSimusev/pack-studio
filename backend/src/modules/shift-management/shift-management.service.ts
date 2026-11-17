import { QueryFailedError } from 'typeorm';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  getShiftFor2A,
  hasManager,
  // getShiftFor5B1,
  // getShiftFor9,
  // isCondition_2A,
  // isCondition_2A_9,
  // isCondition_5B1,
  // isCondition_5B1_9,
  isRelevantShift,
  // normalizeScheduleCode,
  toDateKey,
} from '../../shared/utils/utils';

import {
  EAttendanceCode,
  EScheduleCode,
  ETeamNumber,
  EWorkshopCode,
} from '../../shared/enums/enums';

import { CreateShiftDto } from './dto/create-shift.dto';
// import { ShiftDateDto } from './dto/shift-date.dto';
import { ShiftIdDto } from './dto/shift-id.dto';

import {
  IEmployeeShift,
  ILastShift,
  IProfile,
  IShift,
  IShiftInfo,
  ISuccess,
} from '../../shared/interfaces/api.interface';

// import { AttendanceType } from '../attendance-type/entities/attendance-type.entity';
// import { Employee } from '../employee/entities/employee.entity';
// import { EmployeeShift } from '../employee-shift/entities/employee-shift.entity';
// import { Schedule } from '../schedule/entities/schedule.entity';
// import { Shift } from '../shift/entities/shift.entity';
// import { Team } from '../team/entities/team.entity';
// import { Workshop } from '../workshop/entities/workshop.entity';

import { EmployeeRepository } from '../employee/employee.repository';
import { EmployeeShiftRepository } from '../employee-shift/employee-shift.repository';
import { ShiftRepository } from '../shift/shift.repository';

import { AttendanceTypeService } from '../attendance-type/attendance-type.service';
// import { EmployeeShiftManagementService } from '../employee-shift-management/employee-shift-management.service';
import { ProfessionService } from '../profession/profession.service';
import { ScheduleService } from '../schedule/schedule.service';
import { ShiftService } from '../shift/shift.service';
import { TeamService } from '../team/team.service';
import { WorkshopService } from '../workshop/workshop.service';
// import { EmployeeManagementService } from '../employee-management/employee-management.service';

@Injectable()
export class ShiftManagementService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeShiftRepository: EmployeeShiftRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly attendanceTypeService: AttendanceTypeService,
    private readonly professionService: ProfessionService,
    // private readonly employeeManagementService: EmployeeManagementService,
    // private readonly employeeShiftManagementService: EmployeeShiftManagementService,
    private readonly scheduleService: ScheduleService,
    private readonly shiftService: ShiftService,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  async createShift(dto: CreateShiftDto, profile: IProfile): Promise<ISuccess> {
    // Получаем данные сотрудника, который сделал запрос
    const { workshopCode, teamNumber, scheduleCode } = profile;

    // Получаем связанные сущности по данным сотрудника, который сделал запрос
    const [workshop, team, schedule, attendanceType, allEmployees] =
      await Promise.all([
        this.workshopService.getWorkshopByCode(workshopCode),
        this.teamService.getTeamByNumber(teamNumber),
        this.scheduleService.getScheduleByCode(scheduleCode),
        this.attendanceTypeService.getAttendanceByCode(EAttendanceCode.Y),
        this.employeeRepository.findByWorkshopAndTeam(workshopCode, teamNumber),
      ]);

    // Получаем смену по графику
    // ВАЖНО!!! Сейчас в проекте только график 2-А, иначе нужно логика выбора
    const shiftInfo = getShiftFor2A(team.teamNumber);

    // Проверяем соответствует ли смена графику
    if (
      toDateKey(dto.date) !== toDateKey(shiftInfo.date) ||
      dto.shiftCode !== shiftInfo.shiftCode
    ) {
      throw new ConflictException('Не соответствует графику');
    }

    // Проверяем можно ли создать смену в текущую дату, если сегодня выходной, то нельзя
    if (!isRelevantShift(dto.date, dto.shiftCode)) {
      throw new ConflictException('Сегодня выходной день');
    }

    // Прверяем существование смены, если смена уже есть, выбрасываем ошибку
    await this.shiftService.existsShift(
      dto.date,
      dto.shiftCode,
      workshop.id,
      schedule.id,
    );

    // Создаем смену
    const shift = await this.shiftRepository.create({
      date: dto.date,
      shiftCode: dto.shiftCode,
      workshop,
      team,
      schedule,
    });

    // Руководители (HEAD, LEAD_MASTER, MASTER, DETAIL_MASTER)
    // не попадают в смену сотрудников
    const employees = allEmployees.filter(
      (employee) => !hasManager(employee.homeProfession.professionCode),
    );

    // Создаем смены сотрудников с типом посещаемости 'Я'
    for (const employee of employees) {
      const shiftProfession = await this.professionService.getProfessionByCode(
        employee.homeProfession.professionCode,
      );

      await this.employeeShiftRepository.create({
        employee,
        shift,
        shiftProfession,
        attendanceType,
      });
    }

    return {
      message: 'Смена создана успешно',
    };
  }

  // Метод для TimesheetPage
  async getLastShift(profile: IProfile): Promise<ILastShift | null> {
    // Получаем данные сотрудника, который сделал запрос
    const { workshopCode, teamNumber, scheduleCode } = profile;

    // Получаем связянные сущности
    const [workshop, team, schedule] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.teamService.getTeamByNumber(teamNumber),
      this.scheduleService.getScheduleByCode(scheduleCode),
    ]);

    // Получаем последнюю сохраненную смену в бд
    const shift = await this.shiftService.getShiftByDetails(
      workshop.id,
      team.id,
      schedule.id,
    );

    // Проверяем последнюю смену на актуальность
    // Если смена старая, то выходим из метода - создаем новую смену
    if (!isRelevantShift(shift.date, shift.shiftCode)) {
      return null;
    }

    // Если смена актуальная, то возвращаем ее
    return {
      id: shift.id,
      date: shift.date, // формат YYYY-MM-DD
      shiftCode: shift.shiftCode,
      scheduleCode: shift.schedule.scheduleCode,
      scheduleName: shift.schedule.name,
      isReady: shift.employeeShifts.every((es) => es.isReady === true), // вычисляемое поле
    };
  }
}
