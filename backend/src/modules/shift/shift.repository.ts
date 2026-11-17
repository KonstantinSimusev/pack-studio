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

  // Метод для ShiftPage
  async findById(id: string): Promise<Shift | null> {
    return this.shiftRepository.findOne({
      where: { id },
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
      order: {
        employeeShifts: {
          employee: {
            lastName: 'ASC', // 3. Фамилия: по алфавиту
            firstName: 'ASC', // 4. Имя: по алфавиту (если фамилии совпали)
            patronymic: 'ASC', // 5. Отчество: по алфавиту (если фамилии совпали)
          },
        },
      },
    });
  }

  // Метод для TimesheetPage
  async findByDetails(
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

  // async findOneByDate(
  //   date: Date,
  //   workshopId: string,
  //   teamId: string,
  //   scheduleId: string,
  // ): Promise<Shift | null> {
  //   return this.shiftRepository.findOne({
  //     where: {
  //       date,
  //       workshop: { id: workshopId },
  //       team: { id: teamId },
  //       schedule: { id: scheduleId },
  //     },
  //     relations: this.SHIFT_RELATIONS,
  //     order: this.EMPLOYEE_SHIFTS_ORDER,
  //   });
  // }

  // async findAllByDate(
  //   date: Date,
  //   workshopId: string,
  //   teamId: string,
  //   scheduleId: string,
  // ): Promise<Shift[]> {
  //   return this.shiftRepository.find({
  //     where: {
  //       date,
  //       workshop: { id: workshopId },
  //       team: { id: teamId },
  //       schedule: { id: scheduleId },
  //     },
  //     relations: this.SHIFT_RELATIONS,
  //     order: {
  //       date: 'DESC',
  //       ...this.EMPLOYEE_SHIFTS_ORDER,
  //     },
  //   });
  // }

  // async findAllInRange(
  //   workshopId: string,
  //   teamId: string,
  //   scheduleId: string,
  //   startDate: Date,
  //   endDate: Date,
  // ): Promise<Shift[]> {
  //   // Нормализуем границы диапазона в UTC
  //   const start = new Date(startDate);
  //   start.setUTCHours(0, 0, 0, 0);

  //   const end = new Date(endDate);
  //   end.setUTCHours(0, 0, 0, 0);

  //   return this.shiftRepository.find({
  //     where: {
  //       date: Between(start, end),
  //       workshop: { id: workshopId },
  //       team: { id: teamId },
  //       schedule: { id: scheduleId },
  //     },
  //     relations: [
  //       'workshop',
  //       'team',
  //       'schedule',
  //       // 'employeeShifts',
  //       // 'employeeShifts.attendanceType',
  //       // 'employeeShifts.workplace',
  //     ],
  //     order: {
  //       date: 'DESC',
  //     },
  //   });
  // }

  // async countShifts(
  //   date: Date,
  //   workshopId: string,
  //   teamId: string,
  //   scheduleId: string,
  // ): Promise<number> {
  //   return this.shiftRepository.count({
  //     where: {
  //       date,
  //       workshop: { id: workshopId },
  //       team: { id: teamId },
  //       schedule: { id: scheduleId },
  //     },
  //   });
  // }

  // 3. CRUD: Update
  async save(shift: Shift): Promise<Shift> {
    return this.shiftRepository.save(shift);
  }
}
