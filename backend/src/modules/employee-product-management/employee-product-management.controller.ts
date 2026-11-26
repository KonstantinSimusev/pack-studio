import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { IProfile, ISuccess } from '../../shared/interfaces/api.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

import { CreateEmployeeProductDto } from './dto/create-employee-product.dto';
import { EmployeeProductManagementService } from './employee-product-management.service';

@Controller('employee-product-management')
export class EmployeeProductManagementController {
  constructor(
    private readonly employeeProductManagementService: EmployeeProductManagementService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createEmployeeProduct(
    @Body() dto: CreateEmployeeProductDto,
    @Req() req: Request & { profile: IProfile },
  ): Promise<ISuccess> {
    return this.employeeProductManagementService.createEmployeeProduct(
      dto,
      req.profile,
    );
  }
}
