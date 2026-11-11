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
}
