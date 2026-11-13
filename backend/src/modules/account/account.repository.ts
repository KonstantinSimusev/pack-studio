import { IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<Account>): Promise<Account> {
    const account = this.accountRepository.create(data);
    return this.accountRepository.save(account);
  }

  // 2. CRUD: Read (общие методы поиска)
  async findById(id: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: {
        id,
        employee: {
          assignment: { isActive: true },
        },
      },
      relations: this.ACCOUNT_RELATIONS,
    });
  }

  async findByLogin(login: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: {
        login,
        employee: {
          assignment: { isActive: true },
        },
      },
      relations: this.ACCOUNT_RELATIONS,
    });
  }

  // Получаем все аккаунты с установленным hashedRefreshToken
  async findByHashedRefreshToken(): Promise<Account[]> {
    return this.accountRepository.find({
      where: {
        hashedRefreshToken: Not(IsNull()),
      },
      select: {
        id: true,
        hashedRefreshToken: true,
      },
    });
  }

  // 3. CRUD: Update
  async update(id: string, data: Partial<Account>): Promise<UpdateResult> {
    return this.accountRepository.update(id, data);
  }

  private ACCOUNT_RELATIONS = [
    'employee',
    'employee.homeWorkshop',
    'employee.homeTeam',
    'employee.homeProfession',
    'employee.homeSchedule',
    'employee.assignment',
    'employee.assignment.currentWorkshop',
    'employee.assignment.currentTeam',
    'employee.assignment.currentProfession',
    'employee.assignment.currentSchedule',
  ];
}
