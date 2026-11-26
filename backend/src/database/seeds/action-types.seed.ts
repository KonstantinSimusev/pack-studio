import { DataSource } from 'typeorm';

import { ActionType } from '../../modules/action-type/entities/action-type.entity';
import { actionTypes } from '../data/action-types.data';

export const seedActionTypes = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(ActionType);

  for (const actionType of actionTypes) {
    const exists = await repo.findOne({
      where: { actionCode: actionType.actionCode },
    });

    if (exists) continue;

    await repo.save(actionType);
  }

  console.log(`Типы действий созданы: ${actionTypes.length} записей`);
};
