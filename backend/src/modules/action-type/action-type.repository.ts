import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActionType } from './entities/action-type.entity';

@Injectable()
export class ActionTypeRepository {
  constructor(
    @InjectRepository(ActionType)
    private readonly actionTypeRepository: Repository<ActionType>,
  ) {}

  async findByCode(actionCode: string): Promise<ActionType | null> {
    return this.actionTypeRepository.findOne({
      where: { actionCode },
    });
  }
}
