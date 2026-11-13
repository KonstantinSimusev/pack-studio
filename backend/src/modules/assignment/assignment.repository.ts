import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentRepository {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<Assignment>): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(data);
    return this.assignmentRepository.save(assignment);
  }

  // 2. CRUD: Read (общие методы поиска)
  // async findById(id: string): Promise<Assignment | null> {
  //   return this.assignmentRepository.findOneBy({ id });
  // }

  async findByEmployeeId(employeeId: string): Promise<Assignment | null> {
    return this.assignmentRepository.findOne({
      where: {
        employee: {
          id: employeeId,
        },
      },
      relations: [
        'currentWorkshop',
        'currentTeam',
        'currentProfession',
        'currentSchedule',
      ],
    });
  }

  // 3. CRUD: Update
  async save(assignment: Assignment): Promise<Assignment> {
    return this.assignmentRepository.save(assignment);
  }
}
