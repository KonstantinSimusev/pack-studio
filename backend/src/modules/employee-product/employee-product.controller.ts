import { Controller, Delete, Param, UseGuards } from '@nestjs/common';

import { ISuccess } from '../../shared/interfaces/api.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

import { EmployeeProductService } from './employee-product.service';
import { EmployeeProductIdDto } from './dto/employee-product-id.dto';

@Controller('employee-product')
export class EmployeeProductController {
  constructor(
    private readonly employeeProductService: EmployeeProductService,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteEmployeeProduct(
    @Param() dto: EmployeeProductIdDto,
  ): Promise<ISuccess> {
    return this.employeeProductService.deleteEmployeeProduct(dto.id);
  }
}
