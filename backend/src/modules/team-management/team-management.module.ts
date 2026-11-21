import { Module } from '@nestjs/common';

// import { AttendanceTypeModule } from '../attendance-type/attendance-type.module';
// import { EmployeeManagementModule } from '../employee-management/employee-management.module';
import { EmployeeModule } from '../employee/employee.module';
// import { EmployeeShiftManagementModule } from '../employee-shift-management/employee-shift-management.module';
// import { EmployeeShiftModule } from '../employee-shift/employee-shift.module';
// import { ProfessionModule } from '../profession/profession.module';
// import { ReportAreaModule } from '../report-area/report-area.module';
// import { ReportModule } from '../report/report.module';
// import { ScheduleModule } from '../schedule/schedule.module';
// import { ShiftModule } from '../shift/shift.module';
import { TeamModule } from '../team/team.module';
import { WorkshopModule } from '../workshop/workshop.module';

import { TeamManagementController } from './team-management.controller';
import { TeamManagementService } from './team-management.service';

@Module({
  imports: [
    // AttendanceTypeModule,
    // EmployeeManagementModule,
    EmployeeModule,
    // EmployeeShiftManagementModule,
    // EmployeeShiftModule,
    // ProfessionModule,
    // ReportModule,
    // ReportAreaModule,
    // ScheduleModule,
    // ShiftModule,
    TeamModule,
    WorkshopModule,
  ],
  controllers: [TeamManagementController],
  providers: [TeamManagementService],
  exports: [],
})
export class TeamManagementModule {}
