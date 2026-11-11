import { AppDataSource } from './data-source';
import { seedProfessions } from './seeds/professions.seed';
import { seedSchedules } from './seeds/schedules.seed';
import { seedTeams } from './seeds/teams.seed';

import { seedWorkshops } from './seeds/workshops.seed';

const run = async (): Promise<void> => {
  await AppDataSource.initialize();

  await seedWorkshops(AppDataSource);
  await seedTeams(AppDataSource);
  await seedProfessions(AppDataSource);
  await seedSchedules(AppDataSource);

  // сюда по мере роста проекта добавляйте: await seedWorkers(ds); и т.д.

  await AppDataSource.destroy();
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
