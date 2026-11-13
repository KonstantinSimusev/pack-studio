import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { IAccountInfo, IProfile } from '../../shared/interfaces/api.interface';

import { AccountRepository } from '../account/account.repository';
import { EmployeeService } from '../employee/employee.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class EmployeeAccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
    private readonly employeeService: EmployeeService,
  ) {}

  async updateLoginAndPassword(id: string): Promise<IAccountInfo> {
    // Находим работника по ID
    const employee = await this.employeeService.getEmployeeByIdFromAccount(id);

    // Генерируем новый логин
    const newLogin = this.accountService.generateLogin(
      employee.lastName,
      employee.firstName,
      employee.patronymic,
    );

    // Генерируем новый пароль
    const newPassword = uuidv4();

    // Генерируем соль и хешируем новый пароль
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // Обновляем только нужные поля
    await this.accountRepository.update(employee.account.id, {
      login: newLogin,
      hashedPassword: newHashedPassword,
    });

    return {
      lastName: employee.lastName,
      firstName: employee.firstName,
      patronymic: employee.patronymic,
      login: newLogin,
      password: newPassword,
    };
  }
}
