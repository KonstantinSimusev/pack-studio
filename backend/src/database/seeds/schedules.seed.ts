import { DataSource } from 'typeorm';
import { Schedule } from '../../modules/schedule/entities/schedule.entity';

export const seedSchedules = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Schedule);

  const schedules = [
    { scheduleCode: 'S_5B1', name: '5-Б-1' },
    { scheduleCode: 'S_2A', name: '2-А' },
    { scheduleCode: 'S_9', name: '9' },
    { scheduleCode: 'S_2', name: '2' },
  ];

  for (const schedule of schedules) {
    const exists = await repo.findOne({
      where: { scheduleCode: schedule.scheduleCode },
    });
    if (exists) continue;

    await repo.save(schedule);
  }

  console.log(`Графики засеяны: ${schedules.length} записей`);
};
