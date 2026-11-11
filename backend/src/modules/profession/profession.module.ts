import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profession } from './entities/profession.entity';
import { ProfessionRepository } from './profession.repository';
import { ProfessionService } from './profession.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profession])],
  controllers: [],
  providers: [ProfessionRepository, ProfessionService],
  exports: [ProfessionService],
})
export class ProfessionModule {}
