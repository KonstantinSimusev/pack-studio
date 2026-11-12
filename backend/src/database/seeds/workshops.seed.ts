import { DataSource } from 'typeorm';
import { Workshop } from '../../modules/workshop/entities/workshop.entity';
import { workshops } from '../data/workshops.data';

export const seedWorkshops = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Workshop);

  for (const workshop of workshops) {
    const exists = await repo.findOne({
      where: { workshopCode: workshop.workshopCode },
    });
    if (exists) continue;

    await repo.save(workshop);
  }

  console.log(`Цеха созданы: ${workshops.length} записей`);
};
