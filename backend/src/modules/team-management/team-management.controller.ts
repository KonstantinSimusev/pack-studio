import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard';
import { IHomeTeam, ISuccess } from '../../shared/interfaces/api.interface';
// import { GetTeamDto } from './dto/get-team.dto';

import { TeamManagementService } from './team-management.service';

@Controller('team-management')
export class TeamManagementController {
  constructor(private readonly teamManagementService: TeamManagementService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getHomeTeams(): Promise<IHomeTeam[]> {
    return this.teamManagementService.getHomeTeams();
  }
}
