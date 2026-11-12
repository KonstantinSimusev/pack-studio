import { ConflictException, INestApplicationContext } from '@nestjs/common';
import { IAccountInfo } from '../../shared/interfaces/api.interface';
import { EmployeeManagementService } from '../../modules/employee-management/employee-management.service';
import { employees } from '../data/employees.data';

export const seedEmployees = async (
  app: INestApplicationContext,
): Promise<void> => {
  const service = app.get(EmployeeManagementService);

  const accounts: IAccountInfo[] = [];

  for (const dto of employees) {
    try {
      const account = await service.createEmployee(dto);
      accounts.push(account);
      console.log(
        `Создан: ${account.lastName} ${account.firstName} ${account.patronymic}`,
      );
    } catch (e) {
      // Повторный запуск: сервис не даст создать второго работника
      // с тем же ФИО — таких пропускаем
      if (e instanceof ConflictException) {
        console.log(
          `Пропущен (уже существует): ${dto.lastName} ${dto.firstName}`,
        );
        continue;
      }
      throw e;
    }
  }

  console.log(`Сотрудники созданы: ${accounts.length} записей`);
  // ФИО + логин + одноразовый пароль — в терминал
  console.table(accounts);
};
