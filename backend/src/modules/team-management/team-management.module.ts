import { Module } from '@nestjs/common';

import { EmployeeModule } from '../employee/employee.module';
import { TeamModule } from '../team/team.module';
import { WorkshopModule } from '../workshop/workshop.module';

import { TeamManagementController } from './team-management.controller';
import { TeamManagementService } from './team-management.service';

@Module({
  imports: [EmployeeModule, TeamModule, WorkshopModule],
  controllers: [TeamManagementController],
  providers: [TeamManagementService],
  exports: [],
})
export class TeamManagementModule {}
