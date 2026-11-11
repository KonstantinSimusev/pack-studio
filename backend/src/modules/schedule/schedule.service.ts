import { Injectable, NotFoundException } from '@nestjs/common';

import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async getScheduleByCode(scheduleCode: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findByCode(scheduleCode);

    if (!schedule) {
      throw new NotFoundException(`График ${scheduleCode} не найден`);
    }

    return schedule;
  }

  // async getScheduleById(id: string): Promise<Schedule> {
  //   const schedule = await this.scheduleRepository.findScheduleById(id);

  //   if (!schedule) {
  //     throw new NotFoundException(`График не найден`);
  //   }

  //   return schedule;
  // }
}
