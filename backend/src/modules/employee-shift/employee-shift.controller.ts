import { Controller, Delete, Param, UseGuards } from '@nestjs/common';

import { ISuccess } from '../../shared/interfaces/api.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

import { EmployeeShiftIdDto } from './dto/employee-shift-id.dto';

import { EmployeeShiftService } from './employee-shift.service';

@Controller('employee-shift')
export class EmployeeShiftController {
  constructor(private readonly employeeShiftService: EmployeeShiftService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteEmployeeShift(
    @Param() dto: EmployeeShiftIdDto,
  ): Promise<ISuccess> {
    return this.employeeShiftService.deleteEmployeeShift(dto.id);
  }
}
