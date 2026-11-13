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

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }

    return employee;
  }

  async getEmployeeByIdFromAccount(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findByIdFromAccount(id);

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

  // async getEmployeeWithWorkshopById(id: string): Promise<Employee> {
  //   const employee = await this.employeeRepository.findWithWorkshopById(id);

  //   if (!employee) {
  //     throw new NotFoundException('Работник не найден');
  //   }

  //   return employee;
  // }

  // async getTeamEmployees(
  //   teamNumber: number,
  //   workshopCode: string,
  //   scheduleCode: string,
  // ): Promise<Employee[]> {
  //   const employees = await this.employeeRepository.findByTeamAndSchedule(
  //     teamNumber,
  //     workshopCode,
  //     scheduleCode,
  //   );

  //   if (employees.length === 0) {
  //     throw new NotFoundException(
  //       `Не найдены сотрудники для бригады ${teamNumber}, цеха ${workshopCode}, графика ${scheduleCode}`,
  //     );
  //   }

  //   return employees;
  // }

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
