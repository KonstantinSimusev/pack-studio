import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployeeShift } from './entities/employee-shift.entity';

@Injectable()
export class EmployeeShiftRepository {
  constructor(
    @InjectRepository(EmployeeShift)
    private readonly employeeShiftRepository: Repository<EmployeeShift>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<EmployeeShift>): Promise<EmployeeShift> {
    const employeeShift = this.employeeShiftRepository.create(data);
    return this.employeeShiftRepository.save(employeeShift);
  }

  // 2. CRUD: Read (общие методы поиска)
  async findById(id: string): Promise<EmployeeShift | null> {
    return this.employeeShiftRepository.findOne({
      where: { id },
      relations: [
        'shiftProfession',
        'attendanceType',
        'workplace',
        'shift.workshop',
      ],
    });
  }

  // 3. CRUD: Update
  async save(employeeShift: EmployeeShift): Promise<EmployeeShift> {
    return this.employeeShiftRepository.save(employeeShift);
  }

  // 4. CRUD: Delete
  async deleteById(id: string): Promise<DeleteResult> {
    return this.employeeShiftRepository.delete(id);
  }

  async countByShiftAndEmployee(
    shiftId: string,
    employeeId: string,
  ): Promise<number> {
    return await this.employeeShiftRepository.count({
      where: {
        shift: { id: shiftId },
        employee: { id: employeeId },
      },
    });
  }
}
