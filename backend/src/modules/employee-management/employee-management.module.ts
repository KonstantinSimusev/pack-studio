import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';
import { EmployeeModule } from '../employee/employee.module';
import { PositionModule } from '../position/position.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { TeamModule } from '../team/team.module';

import { EmployeeManagementController } from './employee-management.controller';
import { EmployeeManagementService } from './employee-management.service';

@Module({
  imports: [
    AccountModule,
    EmployeeModule,
    PositionModule,
    ScheduleModule,
    TeamModule,
  ],
  controllers: [EmployeeManagementController],
  providers: [EmployeeManagementService],
  exports: [EmployeeManagementService],
})
export class EmployeeManagementModule {}
