import { DataSource } from 'typeorm';
import { Schedule } from '../../modules/schedule/entities/schedule.entity';
import { schedules } from '../data/schedules.data';

export const seedSchedules = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Schedule);

  for (const schedule of schedules) {
    const exists = await repo.findOne({
      where: { scheduleCode: schedule.scheduleCode },
    });
    if (exists) continue;

    await repo.save(schedule);
  }

  console.log(`Графики созданы: ${schedules.length} записей`);
};
