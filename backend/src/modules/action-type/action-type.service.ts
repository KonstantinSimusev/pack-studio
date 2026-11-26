import { Injectable, NotFoundException } from '@nestjs/common';

import { ActionType } from './entities/action-type.entity';
import { ActionTypeRepository } from './action-type.repository';

@Injectable()
export class ActionTypeService {
  constructor(private readonly actionTypeRepository: ActionTypeRepository) {}

  async getActionTypeByCode(code: string): Promise<ActionType> {
    const actionType = await this.actionTypeRepository.findByCode(code);

    if (!actionType) {
      throw new NotFoundException(
        `Тип действия ${code} не найден в базе данных`,
      );
    }

    return actionType;
  }
}
