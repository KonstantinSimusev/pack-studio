import { DataSource } from 'typeorm';
import { Team } from '../../modules/team/entities/team.entity';
import { teams } from '../data/teams.data';

export const seedTeams = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(Team);

  for (const team of teams) {
    const exists = await repo.findOne({
      where: { teamNumber: team.teamNumber },
    });
    if (exists) continue;

    await repo.save(team);
  }

  console.log(`Бригады созданы: ${teams.length} записей`);
};
