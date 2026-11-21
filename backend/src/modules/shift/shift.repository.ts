import { Between, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<Shift>): Promise<Shift> {
    const shift = this.shiftRepository.create(data);
    return this.shiftRepository.save(shift);
  }

  // 2. CRUD: Read (общие методы поиска)

  // Метод для внутренней логики в сервисе
  async findEntityById(id: string): Promise<Shift | null> {
    return this.shiftRepository.findOneBy({ id });
  }

  // Timesheet Page
  async findLastWithEmployeeShifts(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    return await this.shiftRepository.findOne({
      where: {
        workshop: { id: workshopId },
        team: { id: teamId },
        schedule: { id: scheduleId },
      },
      order: { date: 'DESC' },
      relations: ['workshop', 'team', 'schedule', 'employeeShifts'],
    });
  }

  // Shift Page
  async findById(id: string): Promise<Shift | null> {
    return this.shiftRepository.findOne({
      where: { id },
      order: {
        employeeShifts: {
          employee: {
            lastName: 'ASC', // 3. Фамилия: по алфавиту
            firstName: 'ASC', // 4. Имя: по алфавиту (если фамилии совпали)
            patronymic: 'ASC', // 5. Отчество: по алфавиту (если фамилии совпали)
          },
        },
      },
      relations: [
        'workshop',
        'team',
        'schedule',
        'employeeShifts.employee',
        'employeeShifts.employee.homeWorkshop',
        'employeeShifts.employee.homeTeam',
        'employeeShifts.shiftProfession',
        'employeeShifts.attendanceType',
        'employeeShifts.workplace',
      ],
    });
  }

  // Pages: Production, Shipment, Pack
  async findLastWithReports(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    return await this.shiftRepository.findOne({
      where: {
        workshop: { id: workshopId },
        team: { id: teamId },
        schedule: { id: scheduleId },
      },
      order: {
        date: 'DESC',
        reports: {
          reportArea: {
            areaCode: 'ASC', // стабильный порядок рапортов по участку
          },
        },
      },
      relations: [
        'workshop',
        'team',
        'schedule',
        'reports',
        'reports.reportArea',
        'reports.reportArea.reportType',
      ],
    });
  }

  // Home Page
  async findLastWithAbsentEmployees(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    return await this.shiftRepository.findOne({
      where: {
        workshop: { id: workshopId },
        team: { id: teamId },
        schedule: { id: scheduleId },
      },
      order: { date: 'DESC' },
      relations: [
        'workshop',
        'team',
        'schedule',
        'employeeShifts.attendanceType',
        'employeeShifts.employee.homeProfession',
      ],
    });
  }

  // Team Shift Page
  async findLastWithChartReport(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    return await this.shiftRepository.findOne({
      where: {
        workshop: { id: workshopId },
        team: { id: teamId },
        schedule: { id: scheduleId },
      },
      order: { date: 'DESC' },
      relations: [
        'workshop',
        'team',
        'schedule',
        'reports.reportArea.reportType',
      ],
    });
  }

  async countByProfile(
    date: Date,
    shiftCode: number,
    workshopId: string,
    scheduleId: string,
  ): Promise<number> {
    return await this.shiftRepository.count({
      where: {
        date,
        shiftCode,
        workshop: { id: workshopId },
        schedule: { id: scheduleId },
      },
    });
  }

  // 3. CRUD: Update
  async save(shift: Shift): Promise<Shift> {
    return this.shiftRepository.save(shift);
  }
}
