import { Injectable, NotFoundException } from '@nestjs/common';

import { Workshop } from '../workshop/entities/workshop.entity';
import { Team } from '../team/entities/team.entity';
import { Profession } from '../profession/entities/profession.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

import { AssignmentRepository } from './assignment.repository';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepository: AssignmentRepository) {}

  async updateByEmployee(
    employeeId: string,
    currentWorkshop: Workshop,
    currentTeam: Team,
    currentProfession: Profession,
    currentSchedule: Schedule,
    hasAccess: boolean,
  ): Promise<void> {
    const assignment =
      await this.assignmentRepository.findByEmployeeId(employeeId);

    if (!assignment) {
      throw new NotFoundException('Назначение не найдено');
    }

    // Обновление полей
    assignment.isActive = hasAccess;

    // Обновление связей
    assignment.currentWorkshop = currentWorkshop;
    assignment.currentTeam = currentTeam;
    assignment.currentProfession = currentProfession;
    assignment.currentSchedule = currentSchedule;

    // Сохранение изменений
    await this.assignmentRepository.save(assignment);
  }

  // async getAssignmentById(id: string): Promise<Assignment> {
  //   const assignment = await this.assignmentRepository.findById(id);

  //   if (!assignment) {
  //     throw new NotFoundException(`Назначение не найдено`);
  //   }

  //   return assignment;
  // }
}
