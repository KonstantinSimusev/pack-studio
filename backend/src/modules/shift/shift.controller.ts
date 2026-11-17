import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard';

import { ShiftIdDto } from './dto/shift-id.dto';
import { IShift } from '../../shared/interfaces/api.interface';

import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  // Метод для ShiftPage
  @Get(':id')
  @UseGuards(AuthGuard)
  async getShiftById(@Param() dto: ShiftIdDto): Promise<IShift> {
    return this.shiftService.getShiftById(dto.id);
  }
}
