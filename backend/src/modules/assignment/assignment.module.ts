import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Assignment } from './entities/assignment.entity';
import { AssignmentRepository } from './assignment.repository';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  controllers: [],
  providers: [AssignmentRepository, AssignmentService],
  exports: [AssignmentRepository, AssignmentService],
})
export class AssignmentModule {}
