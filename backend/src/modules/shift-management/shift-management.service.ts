import { ConflictException, Injectable } from '@nestjs/common';

import {
  getShiftFor2A,
  hasManager,
  isRelevantShift,
  toDateKey,
} from '../../shared/utils/utils';

import {
  EAttendanceCode,
  EScheduleCode,
  EWorkshopCode,
} from '../../shared/enums/enums';
import { CreateShiftDto } from './dto/create-shift.dto';

import {
  IAbsence,
  IChartReportItem,
  IChartReportList,
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

  // Timesheet Page
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

  // Timesheet Page
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

  // Pages: Production, Shipment, Pack
  async getLastShiftWithReports(
    profile: IProfile,
  ): Promise<IShiftReport | null> {
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

  // Home Page
  async getAbsenceSummary(): Promise<IAbsence[]> {
    // ВАЖНО!!! Не использовать profile: IProfile
    // Сейчас только один цех в разарботке
    // Ручками назначил цех и график (Enum)
    // При маштабировании эти данные берем с клиента
    const workshopCode = EWorkshopCode.W_LPC11;
    const scheduleCode = EScheduleCode.S_2A;

    // Получаем связянные сущности
    const [workshop, schedule] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.scheduleService.getScheduleByCode(scheduleCode),
    ]);

    const teamNumbers = [1, 2, 3, 4];
    const absences: IAbsence[] = [];

    for (const teamNumber of teamNumbers) {
      const team = await this.teamService.getTeamByNumber(teamNumber);

      const shift = await this.shiftService.getLastShiftAbsentEmployees(
        workshop.id,
        team.id,
        schedule.id,
      );

      if (!shift) continue; // у этой бригады смен ещё нет — пропускаем

      for (const employeeShift of shift.employeeShifts) {
        const professionName = employeeShift.employee.homeProfession.name;

        const existing = absences.find(
          (absence) => absence.name === professionName,
        );

        if (existing) {
          existing.count += 1;
        } else {
          absences.push({ name: professionName, count: 1 });
        }
      }
    }
    
    return absences;
  }

  // Team Shift Page
  async getLastShiftWithChartReport(
    teamNumber: number,
  ): Promise<IChartReportList | null> {
    // ВАЖНО!!! Не использовать profile: IProfile
    // Сейчас только один цех в разработке
    // Ручками назначил цех и график (Enum)
    // При масштабировании эти данные берем с клиента
    const workshopCode = EWorkshopCode.W_LPC11;
    const scheduleCode = EScheduleCode.S_2A;

    // Получаем связанные сущности
    const [workshop, team, schedule] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.teamService.getTeamByNumber(teamNumber),
      this.scheduleService.getScheduleByCode(scheduleCode),
    ]);

    const shift = await this.shiftService.getLastShiftWithChartReport(
      workshop.id,
      team.id,
      schedule.id,
    );

    // Смены нет (старт проекта, бд пустая) — шапка есть, группы пустые
    if (!shift) {
      return null;
    }

    const production: IChartReportItem[] = [];
    const shipment: IChartReportItem[] = [];
    const pack: IChartReportItem[] = [];
    const residue: IChartReportItem[] = [];

    for (const report of shift.reports) {
      const item: IChartReportItem = {
        id: report.id,
        title: report.reportArea.shortName,
        count: report.count,
      };

      switch (report.reportArea.reportType.typeCode) {
        case 'production':
          production.push(item);
          break;
        case 'shipment':
          shipment.push(item);
          break;
        case 'pack':
          pack.push(item);
          break;
        case 'residue':
          residue.push(item);
          break;
      }
    }

    return {
      workshopName: workshop.name,
      shiftDate: shift.date,
      shiftCode: shift.shiftCode,
      teamNumber: team.teamNumber,
      production,
      shipment,
      pack,
      residue,
    };
  }
}
