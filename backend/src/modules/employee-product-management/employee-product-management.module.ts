import { Module } from '@nestjs/common';

import { ActionTypeModule } from '../action-type/action-type.module';
// import { AttendanceTypeModule } from '../attendance-type/attendance-type.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeProductModule } from '../employee-product/employee-product.module';
import { EmployeeShiftModule } from '../employee-shift/employee-shift.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ShiftModule } from '../shift/shift.module';
import { TeamModule } from '../team/team.module';

import { EmployeeProductManagementController } from './employee-product-management.controller';
import { EmployeeProductManagementService } from './employee-product-management.service';
import { WorkshopModule } from '../workshop/workshop.module';

@Module({
  imports: [
    ActionTypeModule,
    // AttendanceTypeModule,
    EmployeeModule,
    EmployeeProductModule,
    ScheduleModule,
    ShiftModule,
    TeamModule,
    WorkshopModule,
  ],
  controllers: [EmployeeProductManagementController],
  providers: [EmployeeProductManagementService],
  exports: [],
})
export class EmployeeProductManagementModule {}
