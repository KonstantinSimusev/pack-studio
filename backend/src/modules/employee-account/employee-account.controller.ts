import { Controller, Param, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard';

import { EmployeeIdDto } from './dto/employee-id.dto';
import { IAccountInfo, IProfile } from '../../shared/interfaces/api.interface';

import { EmployeeAccountService } from './employee-account.service';

@Controller('employee-account')
export class EmployeeAccountController {
  constructor(
    private readonly employeeAccountService: EmployeeAccountService,
  ) {}

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateLoginAndPassword(
    @Param() dto: EmployeeIdDto,
  ): Promise<IAccountInfo> {
    return this.employeeAccountService.updateLoginAndPassword(dto.id);
  }
}
