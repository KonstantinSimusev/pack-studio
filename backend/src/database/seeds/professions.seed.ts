import { DataSource } from 'typeorm';
import { Profession } from '../../modules/profession/entities/profession.entity';
import { professions } from '../data/professions.data';

export const seedProfessions = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Profession);

  for (const profession of professions) {
    const exists = await repo.findOne({
      where: { professionCode: profession.professionCode },
    });
    if (exists) continue;

    await repo.save(profession);
  }

  console.log(`Профессии созданы: ${professions.length} записей`);
};
