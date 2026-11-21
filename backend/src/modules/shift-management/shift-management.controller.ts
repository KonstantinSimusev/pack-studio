import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthGuard } from '../auth/guards/auth.guard';

import {
  IAbsence,
  IChartReportList,
  ILastShift,
  IProfile,
  IShiftReport,
  ISuccess,
} from '../../shared/interfaces/api.interface';

import { CreateShiftDto } from './dto/create-shift.dto';

import { ShiftManagementService } from './shift-management.service';
import { GetTeamShiftDto } from './dto/get-team-shift.dto';

@Controller('shift-management')
export class ShiftManagementController {
  constructor(
    private readonly shiftManagementService: ShiftManagementService,
  ) {}

  // Timesheet Page
  @Post()
  @UseGuards(AuthGuard)
  async createShift(
    @Body() dto: CreateShiftDto,
    @Req() req: Request & { profile: IProfile },
  ): Promise<ISuccess> {
    return this.shiftManagementService.createShift(dto, req.profile);
  }

  // Timesheet Page
  @Get('last-shift')
  @UseGuards(AuthGuard)
  async getLastShift(
    @Req() req: Request & { profile: IProfile },
  ): Promise<ILastShift | null> {
    return this.shiftManagementService.getLastShift(req.profile);
  }

  // Report Page
  @Get('last-shift-reports')
  @UseGuards(AuthGuard)
  async getLastShiftWithReports(
    @Req() req: Request & { profile: IProfile },
  ): Promise<IShiftReport | null> {
    return this.shiftManagementService.getLastShiftWithReports(req.profile);
  }

  // Home Page
  @Get('absence-summary')
  @UseGuards(AuthGuard)
  async getAbsenceSummary(): Promise<IAbsence[]> {
    return this.shiftManagementService.getAbsenceSummary();
  }

  // Team Shift Page
  @Get(':teamNumber')
  @UseGuards(AuthGuard)
  async getLastShiftWithChartReport(
    @Param() dto: GetTeamShiftDto,
  ): Promise<IChartReportList | null> {
    return this.shiftManagementService.getLastShiftWithChartReport(
      dto.teamNumber,
    );
  }
}
