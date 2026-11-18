import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '../app.module';

import { seedAttendanceTypes } from './seeds/attendance-types.seed';
import { seedEmployees } from './seeds/employees.seed';
import { seedProfessions } from './seeds/professions.seed';
import { seedReportAreas } from './seeds/report-areas.seed';
import { seedReportTypes } from './seeds/report-types.seed';
import { seedSchedules } from './seeds/schedules.seed';
import { seedTeams } from './seeds/teams.seed';
import { seedWorkplaces } from './seeds/workplaces.seed';
import { seedWorkshops } from './seeds/workshops.seed';

const run = async (): Promise<void> => {
  // Поднимаем DI-контейнер без HTTP-сервера: сервисы, репозитории, конфиг — как в приложении
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const dataSource = app.get(DataSource);

  // Справочники — напрямую через репозитории
  await seedWorkshops(dataSource); // цеха — нужны для участков и рабочих мест
  await seedProfessions(dataSource); // профессии — нужны для рабочих мест
  await seedTeams(dataSource); // бригады
  await seedSchedules(dataSource); // графики
  await seedAttendanceTypes(dataSource); // типы посещаемости
  await seedWorkplaces(dataSource); // рабочие места — после цехов и профессий
  await seedReportTypes(dataSource); // типы рапортов — до участков
  await seedReportAreas(dataSource); // участки — после цехов и типов

  // Работники — через сервис, логика создания живёт в EmployeeManagementService
  await seedEmployees(app);

  await app.close();
};

run()
  .then(() => {
    console.log('Все сиды выполнены');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Ошибка сида:', e);
    process.exit(1);
  });
