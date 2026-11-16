import { DataSource } from 'typeorm';

import { Profession } from '../../modules/profession/entities/profession.entity';
import { Workplace } from '../../modules/work-place/entities/work-place.entity';
import { Workshop } from '../../modules/workshop/entities/workshop.entity';
import { workplaces } from '../data/workplaces.data';

export const seedWorkplaces = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Workplace);
  const workshopRepo = ds.getRepository(Workshop);
  const professionRepo = ds.getRepository(Profession);

  for (const workplace of workplaces) {
    const workshop = await workshopRepo.findOne({
      where: { workshopCode: workplace.workshopCode },
    });

    const profession = await professionRepo.findOne({
      where: { professionCode: workplace.professionCode },
    });

    if (!workshop || !profession) continue;

    const exists = await repo.findOne({
      where: {
        name: workplace.name,
        workshop: { id: workshop.id },
        profession: { id: profession.id },
      },
    });
    
    if (exists) continue;

    await repo.save({
      name: workplace.name,
      workshop,
      profession,
    });
  }

  console.log(`Рабочие места созданы: ${workplaces.length} записей`);
};
