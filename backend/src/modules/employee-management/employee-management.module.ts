import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';
import { AssignmentModule } from '../assignment/assignment.module';
import { EmployeeModule } from '../employee/employee.module';
import { ProfessionModule } from '../profession/profession.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { TeamModule } from '../team/team.module';
import { WorkshopModule } from '../workshop/workshop.module';

import { EmployeeManagementController } from './employee-management.controller';
import { EmployeeManagementService } from './employee-management.service';

@Module({
  imports: [
    AccountModule,
    AssignmentModule,
    EmployeeModule,
    ProfessionModule,
    ScheduleModule,
    TeamModule,
    WorkshopModule,
  ],
  controllers: [EmployeeManagementController],
  providers: [EmployeeManagementService],
  exports: [EmployeeManagementService],
})
export class EmployeeManagementModule {}
