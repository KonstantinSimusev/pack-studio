import { DataSource } from 'typeorm';
import { Workshop } from '../../modules/workshop/entities/workshop.entity';

export const seedWorkshops = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Workshop);

  const workshops = [
    { workshopCode: 'W_LPC4', name: 'ЛПЦ-4' },
    { workshopCode: 'W_LPC5', name: 'ЛПЦ-5' },
    { workshopCode: 'W_LPC8_UGP', name: 'ЛПЦ-8 (участок гнутого профиля)' },
    { workshopCode: 'W_LPC8_UL', name: 'ЛПЦ-8 (участок ленты)' },
    { workshopCode: 'W_LPC10', name: 'ЛПЦ-10' },
    { workshopCode: 'W_LPC11', name: 'ЛПЦ-11' },
    { workshopCode: 'W_PMP_SOUTH', name: 'ПМП (южный блок)' },
    { workshopCode: 'W_PMP_NORTH', name: 'ПМП (северный блок)' },
  ];

  for (const workshop of workshops) {
    const exists = await repo.findOne({
      where: { workshopCode: workshop.workshopCode },
    });
    if (exists) continue;

    await repo.save(workshop);
  }

  console.log(`Цеха засеяны: ${workshops.length} записей`);
};
