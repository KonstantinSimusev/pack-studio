import { Module } from '@nestjs/common';

import { AttendanceTypeModule } from '../attendance-type/attendance-type.module';
import { EmployeeManagementModule } from '../employee-management/employee-management.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeShiftManagementModule } from '../employee-shift-management/employee-shift-management.module';
import { EmployeeShiftModule } from '../employee-shift/employee-shift.module';
import { ProfessionModule } from '../profession/profession.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ShiftModule } from '../shift/shift.module';
import { TeamModule } from '../team/team.module';
import { WorkshopModule } from '../workshop/workshop.module';

import { ShiftManagementController } from './shift-management.controller';
import { ShiftManagementService } from './shift-management.service';

@Module({
  imports: [
    AttendanceTypeModule,
    EmployeeManagementModule,
    EmployeeModule,
    EmployeeShiftManagementModule,
    EmployeeShiftModule,
    ProfessionModule,
    ScheduleModule,
    ShiftModule,
    TeamModule,
    WorkshopModule,
  ],
  controllers: [ShiftManagementController],
  providers: [ShiftManagementService],
  exports: [ShiftManagementService],
})
export class ShiftManagementModule {}
