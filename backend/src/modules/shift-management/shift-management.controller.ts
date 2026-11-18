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
  ILastShift,
  IProfile,
  IShiftReport,
  ISuccess,
} from '../../shared/interfaces/api.interface';

import { CreateShiftDto } from './dto/create-shift.dto';

import { ShiftManagementService } from './shift-management.service';

@Controller('shift-management')
export class ShiftManagementController {
  constructor(
    private readonly shiftManagementService: ShiftManagementService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createShift(
    @Body() dto: CreateShiftDto,
    @Req() req: Request & { profile: IProfile },
  ): Promise<ISuccess> {
    return this.shiftManagementService.createShift(dto, req.profile);
  }

  @Get('last-shift')
  @UseGuards(AuthGuard)
  async getLastShift(
    @Req() req: Request & { profile: IProfile },
  ): Promise<ILastShift | null> {
    return this.shiftManagementService.getLastShift(req.profile);
  }

  @Get('last-shift-reports')
  @UseGuards(AuthGuard)
  async getLastShiftWithReports(
    @Req() req: Request & { profile: IProfile },
  ): Promise<IShiftReport | null> {
    return this.shiftManagementService.getLastShiftWithReports(req.profile);
  }
}
