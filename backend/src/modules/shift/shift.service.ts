import { Injectable, NotFoundException } from '@nestjs/common';

import {
  EAttendanceCode,
  EScheduleCode,
  EWorkshopCode,
} from '../../shared/enums/enums';
import { IEmployeeShift, IShift } from '../../shared/interfaces/api.interface';

import { EmployeeShift } from '../employee-shift/entities/employee-shift.entity';
import { Shift } from './entities/shift.entity';
import { ShiftRepository } from './shift.repository';
import { hasManager } from '../../shared/utils/utils';

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
  ): Promise<Shift | null> {
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
