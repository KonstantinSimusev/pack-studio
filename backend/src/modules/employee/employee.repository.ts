import { DeleteResult, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(data);
    return this.employeeRepository.save(employee);
  }

  // 2. CRUD: Read (общие методы поиска)
  async findByWorkshopAndTeam(
    workshopCode: string,
    teamNumber: number,
  ): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        homeWorkshop: { workshopCode },
        homeTeam: { teamNumber },
      },
      relations: [
        'homeWorkshop',
        'homeTeam',
        'homeProfession',
        'homeSchedule',
        'assignment.currentWorkshop',
        'assignment.currentTeam',
        'assignment.currentProfession',
        'assignment.currentSchedule',
      ],
    });
  }

  async findById(id: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: [
        'homeWorkshop',
        'homeTeam',
        'homeProfession',
        'homeSchedule',
        'assignment.currentWorkshop',
        'assignment.currentTeam',
        'assignment.currentProfession',
        'assignment.currentSchedule',
      ],
    });
  }

  async findByIdWithAccount(id: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['account'],
    });
  }

  async findByPersonalNumberForAdd(
    personalNumber: number,
  ): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { personalNumber },
      relations: ['homeProfession'],
    });
  }

  async findByPersonalNumber(personalNumber: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { personalNumber },
      relations: [
        'homeWorkshop',
        'homeTeam',
        'homeProfession',
        'homeSchedule',
        'assignment.currentWorkshop',
        'assignment.currentTeam',
        'assignment.currentProfession',
        'assignment.currentSchedule',
      ],
    });
  }

  // Home Page
  async findAllByWorkshop(workshopId: string): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        homeWorkshop: { id: workshopId },
      },
      relations: ['assignment.currentProfession', 'assignment.currentTeam'],
    });
  }

  // Home Page
  async findAllByWorkshopAndTeam(
    workshopId: string,
    teamId: string,
  ): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        homeWorkshop: { id: workshopId },
        homeTeam: { id: teamId },
      },
      relations: ['homeProfession'],
    });
  }

  // 3. CRUD: Update
  async save(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  // 4. CRUD: Delete
  async delete(id: string): Promise<DeleteResult> {
    return this.employeeRepository.delete(id);
  }

  // 5. Вспомогательные методы проверки существования
  async countByFullName(
    lastName: string,
    firstName: string,
    patronymic: string,
  ): Promise<number> {
    return this.employeeRepository.count({
      where: {
        lastName,
        firstName,
        patronymic,
      },
    });
  }

  async countByPersonalNumber(personalNumber: number): Promise<number> {
    return this.employeeRepository.count({
      where: { personalNumber },
    });
  }

  // Находим активных сотрудников
  async countTeamManagers(
    workshopId: string,
    teamId: string,
    professionId: string,
    scheduleId: string,
  ): Promise<number> {
    return this.employeeRepository.count({
      where: {
        assignment: { isActive: true },
        homeWorkshop: { id: workshopId },
        homeTeam: { id: teamId },
        homeProfession: { id: professionId },
        homeSchedule: { id: scheduleId },
      },
    });
  }

  // Находим активных сотрудников
  async countTeamManagersExcluding(
    employeeId: string,
    workshopId: string,
    teamId: string,
    professionId: string,
    scheduleId: string,
  ): Promise<number> {
    return this.employeeRepository.count({
      where: {
        id: Not(employeeId),
        assignment: { isActive: true },
        homeWorkshop: { id: workshopId },
        homeTeam: { id: teamId },
        homeSchedule: { id: scheduleId },
        homeProfession: { id: professionId },
      },
    });
  }
}
