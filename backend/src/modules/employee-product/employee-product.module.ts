import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeProduct } from './entities/employee-product.entity';
import { EmployeeProductController } from './employee-product.controller';
import { EmployeeProductService } from './employee-product.service';
import { EmployeeProductRepository } from './employee-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProduct])],
  controllers: [EmployeeProductController],
  providers: [EmployeeProductRepository, EmployeeProductService],
  exports: [EmployeeProductRepository, EmployeeProductService],
})
export class EmployeeProductModule {}
