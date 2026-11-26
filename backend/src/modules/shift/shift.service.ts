import { Injectable, NotFoundException } from '@nestjs/common';

import { hasManager } from '../../shared/utils/utils';
import { EAttendanceCode } from '../../shared/enums/enums';

import {
  IEmployeeShift,
  IReportData,
  IShift,
  IReportSection,
  IReportSectionRow,
} from '../../shared/interfaces/api.interface';

import { EmployeeShift } from '../employee-shift/entities/employee-shift.entity';
import { Shift } from './entities/shift.entity';

import { ShiftRepository } from './shift.repository';

@Injectable()
export class ShiftService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  // Метод для внутренней логики в сервисе
  async getEntityById(id: string): Promise<Shift> {
    const shift = await this.shiftRepository.findEntityById(id);

    if (!shift) {
      throw new NotFoundException(`Смена с ID ${id} не найдена`);
    }

    return shift;
  }

  // Timesheet Page
  async getLastShiftWithEmployeeShifts(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift> {
    const shift = await this.shiftRepository.findLastWithEmployeeShifts(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      throw new NotFoundException('Смена не найдена');
    }

    return shift;
  }

  // Shift Page
  async getShiftById(id: string): Promise<IShift> {
    const shift = await this.shiftRepository.findById(id);

    if (!shift) {
      throw new NotFoundException(`Смена с ID ${id} не найдена`);
    }

    return this.mapToIShift(shift);
  }

  // Pages: Production, Shipment, Pack
  async getLastShiftWithReports(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    const shift = await this.shiftRepository.findLastWithReports(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      throw new NotFoundException('Смена не найдена');
    }

    return shift;
  }

  // Home Page
  async getLastShiftAbsentEmployees(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    const shift = await this.shiftRepository.findLastWithAbsentEmployees(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      return null; // смены нет — это состояние данных, а не ошибка (старт проекта - бд пустая)
    }

    // Оставляем только отсутствующих по болезни (код «Б»)
    shift.employeeShifts = shift.employeeShifts.filter(
      (employeeShift) =>
        employeeShift.attendanceType.attendanceCode === EAttendanceCode.B,
    );

    return shift;
  }

  // Team Shift Page
  async getLastShiftWithChartReport(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    const shift = await this.shiftRepository.findLastWithChartReport(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      return null; // смены нет — это состояние данных, а не ошибка (старт проекта - бд пустая)
    }

    return shift;
  }

  // Excel Report
  async getShiftByIdWithExcelReport(shiftId: string): Promise<IReportData> {
    const shift = await this.shiftRepository.findByIdWithExcelReport(shiftId);

    if (!shift) {
      throw new NotFoundException(`Смена с id ${shiftId} не найдена`);
    }

    return this.mapShiftToReportData(shift);
  }

  // Pages: Scan, ManualInput
  async getLastShiftWithEmployeeProducts(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift> {
    const shift = await this.shiftRepository.findLastWithEmployeeProducts(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      throw new NotFoundException('Смена не найдена');
    }

    return shift;
  }

  private mapShiftToReportData(shift: Shift): IReportData {
    // count по areaCode в рамках каждого типа
    const countsByType = new Map<string, Map<string, number>>();

    for (const report of shift.reports ?? []) {
      const typeCode = report.reportArea.reportType.typeCode;

      if (!countsByType.has(typeCode)) {
        countsByType.set(typeCode, new Map());
      }
      countsByType.get(typeCode)!.set(report.reportArea.areaCode, report.count);
    }

    // Типы, встретившиеся в рапортах, сортируем по typeCode
    const types = [
      ...new Map(
        (shift.reports ?? []).map((rep) => [
          rep.reportArea.reportType.typeCode,
          rep.reportArea.reportType,
        ]),
      ).values(),
    ].sort((a, b) => a.typeCode.localeCompare(b.typeCode));

    const sections: IReportSection[] = types.map((type) => {
      const rows: IReportSectionRow[] = type.reportAreas
        .slice()
        .sort((a, b) => a.areaCode.localeCompare(b.areaCode))
        .map((area) => ({
          name: area.name,
          value: countsByType.get(type.typeCode)?.get(area.areaCode) ?? null,
        }));

      // Сумма блока: null-прочерки в расчёт не идут
      const total = rows.reduce((sum, row) => sum + (row.value ?? 0), 0);

      return {
        title: type.name,
        unit: type.unit,
        rows,
        total,
      };
    });

    return {
      workshopName: shift.workshop.name,
      shiftDate: new Date(shift.date),
      shiftCode: shift.shiftCode,
      teamNumber: shift.team.teamNumber,
      sections,
    };
  }

  async existsShift(
    date: Date,
    shiftCode: number,
    workshopId: string,
    scheduleId: string,
  ): Promise<void> {
    const count = await this.shiftRepository.countByProfile(
      date,
      shiftCode,
      workshopId,
      scheduleId,
    );

    if (count > 0) {
      throw new NotFoundException('Смена уже создана');
    }
  }

  private mapToIShift(shift: Shift): IShift {
    return {
      id: shift.id,
      date: shift.date, // формат YYYY-MM-DD
      workshopCode: shift.workshop.workshopCode,
      teamNumber: shift.team.teamNumber,
      shiftCode: shift.shiftCode,
      employeeShifts: shift.employeeShifts
        // Руководителей в списке работников не показываем:
        // это служебные записи, а не отмечаемые сотрудники
        .filter(
          (employeeShift) =>
            !hasManager(employeeShift.shiftProfession.professionCode),
        )
        .map((employeeShift) => this.mapEmployeeShift(shift, employeeShift)),
    };
  }

  private mapEmployeeShift(
    shift: Shift,
    employeeShift: EmployeeShift,
  ): IEmployeeShift {
    // Вычисляемое поле в сущности (в бд не сохраняется)
    const canDelete =
      shift.workshop.workshopCode !==
        employeeShift.employee.homeWorkshop.workshopCode ||
      shift.team.teamNumber !== employeeShift.employee.homeTeam.teamNumber;

    return {
      id: employeeShift.id,
      isReady: employeeShift.isReady,
      shiftProfessionCode: employeeShift.shiftProfession.professionCode,
      shiftProfessionName: employeeShift.shiftProfession.name,
      attendanceCode: employeeShift.attendanceType.attendanceCode,
      workplaceName: employeeShift.workplace?.name ?? null,
      employee: {
        id: employeeShift.employee.id,
        lastName: employeeShift.employee.lastName,
        firstName: employeeShift.employee.firstName,
        patronymic: employeeShift.employee.patronymic,
        personalNumber: employeeShift.employee.personalNumber,
        homeWorkshopCode: employeeShift.employee.homeWorkshop.workshopCode,
        homeTeamNumber: employeeShift.employee.homeTeam.teamNumber,
      },
      canDelete,
    };
  }
}
