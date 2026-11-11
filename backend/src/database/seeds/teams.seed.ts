import { DataSource } from 'typeorm';
import { Team } from '../../modules/team/entities/team.entity';

export const seedTeams = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Team);

  const teamNumbers = [1, 2, 3, 4, 5];

  for (const teamNumber of teamNumbers) {
    const exists = await repo.findOne({ where: { teamNumber } });
    if (exists) continue;

    await repo.save({ teamNumber });
  }

  console.log(`Бригады засеяны: ${teamNumbers.length} записей`);
};
