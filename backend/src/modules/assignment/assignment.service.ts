import { Injectable, NotFoundException } from '@nestjs/common';

import { Assignment } from './entities/assignment.entity';
import { AssignmentRepository } from './assignment.repository';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepository: AssignmentRepository) {}

  // async getAssignmentById(id: string): Promise<Assignment> {
  //   const assignment = await this.assignmentRepository.findById(id);

  //   if (!assignment) {
  //     throw new NotFoundException(`Назначение не найдено`);
  //   }

  //   return assignment;
  // }
}
