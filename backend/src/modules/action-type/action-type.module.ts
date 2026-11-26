import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionType } from './entities/action-type.entity';
import { ActionTypeRepository } from './action-type.repository';
import { ActionTypeService } from './action-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActionType])],
  controllers: [],
  providers: [ActionTypeRepository, ActionTypeService],
  exports: [ActionTypeRepository, ActionTypeService],
})
export class ActionTypeModule {}