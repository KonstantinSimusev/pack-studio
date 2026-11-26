import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeProduct } from './entities/employee-product.entity';

@Injectable()
export class EmployeeProductRepository {
  constructor(
    @InjectRepository(EmployeeProduct)
    private readonly employeeProductRepository: Repository<EmployeeProduct>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<EmployeeProduct>): Promise<EmployeeProduct> {
    const product = this.employeeProductRepository.create(data);
    return this.employeeProductRepository.save(product);
  }

  // 2. CRUD: Read (общие методы поиска)
  async findAllByNumbers(
    heatNumber: number,
    partyNumber: number,
    productNumber: number,
  ): Promise<EmployeeProduct[]> {
    return this.employeeProductRepository.find({
      where: {
        heatNumber,
        partyNumber,
        productNumber,
      },
      relations: ['actionType'],
    });
  }

  // 4. CRUD: Delete
  async delete(id: string): Promise<DeleteResult> {
    return this.employeeProductRepository.delete(id);
  }
}
