import { ConflictException, Injectable } from '@nestjs/common';

import {
  getShiftFor2A,
  hasManager,
  isRelevantShift,
  toDateKey,
} from '../../shared/utils/utils';

import { EAttendanceCode } from '../../shared/enums/enums';
import { CreateShiftDto } from './dto/create-shift.dto';

import {
  ILastShift,
  IProfile,
  IShiftReport,
  ISuccess,
} from '../../shared/interfaces/api.interface';

import { EmployeeRepository } from '../employee/employee.repository';
import { EmployeeShiftRepository } from '../employee-shift/employee-shift.repository';
import { ReportAreaRepository } from '../report-area/report-area.repository';
import { ReportRepository } from '../report/report.repository';
import { ShiftRepository } from '../shift/shift.repository';

import { AttendanceTypeService } from '../attendance-type/attendance-type.service';
import { ProfessionService } from '../profession/profession.service';
import { ScheduleService } from '../schedule/schedule.service';
import { ShiftService } from '../shift/shift.service';
import { TeamService } from '../team/team.service';
import { WorkshopService } from '../workshop/workshop.service';

@Injectable()
export class ShiftManagementService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeShiftRepository: EmployeeShiftRepository,
    private readonly reportAreaRepository: ReportAreaRepository,
    private readonly reportRepository: ReportRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly attendanceTypeService: AttendanceTypeService,
    private readonly professionService: ProfessionService,
    private readonly scheduleService: ScheduleService,
    private readonly shiftService: ShiftService,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  async createShift(dto: CreateShiftDto, profile: IProfile): Promise<ISuccess> {
    // Получаем данные сотрудника, который сделал запрос
    const { workshopCode, teamNumber, scheduleCode } = profile;

    // Получаем связанные сущности по данным сотрудника, который сделал запрос
    const [
      workshop,
      team,
      schedule,
      attendanceType,
      allEmployees,
      reportAreas,
    ] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.teamService.getTeamByNumber(teamNumber),
      this.scheduleService.getScheduleByCode(scheduleCode),
      this.attendanceTypeService.getAttendanceByCode(EAttendanceCode.Y),
      this.employeeRepository.findByWorkshopAndTeam(workshopCode, teamNumber),
      this.reportAreaRepository.findByWorkshopCode(workshopCode),
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

    // Создаем рапорты смены с count = 0
    for (const reportArea of reportAreas) {
      await this.reportRepository.create({
        shift,
        reportArea,
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
    const shift = await this.shiftService.getLastShiftWithEmployeeShifts(
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

  // Метод для ReportPage
  async getLastShiftWithReports(profile: IProfile): Promise<IShiftReport | null> {
    // Получаем данные сотрудника, который сделал запрос
    const { workshopCode, teamNumber, scheduleCode } = profile;

    // Получаем связянные сущности
    const [workshop, team, schedule] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.teamService.getTeamByNumber(teamNumber),
      this.scheduleService.getScheduleByCode(scheduleCode),
    ]);

    // Получаем последнюю сохраненную смену в бд
    const shift = await this.shiftService.getLastShiftWithReports(
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
      workshopCode: shift.workshop.workshopCode,
      teamNumber: shift.team.teamNumber,
      reports: shift.reports.map((report) => ({
        id: report.id,
        type: report.reportArea.reportType.typeCode, // production, shipment, pack, fix, residue
        areaCode: report.reportArea.areaCode,
        areaName: report.reportArea.name,
        count: report.count,
      })),
    };
  }
}
