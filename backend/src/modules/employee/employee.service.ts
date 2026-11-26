import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ISuccess } from '../../shared/interfaces/api.interface';

import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  // Метод для внутренней логики в сервисе
  async getEntityById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findEntityById(id);

    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }

    return employee;
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }

    return employee;
  }

  async getEmployeeByIdWithAccount(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findByIdWithAccount(id);

    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }

    return employee;
  }

  async getEmployeeByPersonalNumberForAdd(
    personalNumber: number,
  ): Promise<Employee> {
    const employee =
      await this.employeeRepository.findByPersonalNumberForAdd(personalNumber);

    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }

    return employee;
  }

  async getEmployeeByPersonalNumber(personalNumber: number): Promise<Employee> {
    const employee =
      await this.employeeRepository.findByPersonalNumber(personalNumber);

    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }

    return employee;
  }

  async deleteEmployee(id: string): Promise<ISuccess> {
    const result = await this.employeeRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Работник не найден');
    }

    return {
      message: 'Работник удален успешно',
    };
  }

  async validateUniqueFullName(
    lastName: string,
    firstName: string,
    patronymic: string,
  ): Promise<void> {
    const count = await this.employeeRepository.countByFullName(
      lastName,
      firstName,
      patronymic,
    );

    if (count > 0) {
      throw new ConflictException('ФИО занято');
    }
  }

  async validateUniquePersonalNumber(personalNumber: number): Promise<void> {
    const count =
      await this.employeeRepository.countByPersonalNumber(personalNumber);

    if (count > 0) {
      throw new ConflictException('Личный номер занят');
    }
  }

  async existsTeamManager(
    workshopId: string,
    teamId: string,
    professionId: string,
    scheduleId: string,
  ): Promise<void> {
    const count = await this.employeeRepository.countTeamManagers(
      workshopId,
      teamId,
      professionId,
      scheduleId,
    );

    if (count > 0) {
      throw new ConflictException('Руководитель уже существует');
    }
  }

  async existsTeamManagerExcluding(
    employeeId: string,
    workshopId: string,
    teamId: string,
    professionId: string,
    scheduleId: string,
  ): Promise<void> {
    const count = await this.employeeRepository.countTeamManagersExcluding(
      employeeId,
      workshopId,
      teamId,
      professionId,
      scheduleId,
    );

    if (count > 0) {
      throw new ConflictException('Руководитель уже существует');
    }
  }
}
