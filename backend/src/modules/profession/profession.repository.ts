import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Profession } from './entities/profession.entity';

@Injectable()
export class ProfessionRepository {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  // 2. CRUD: Read (общие методы поиска)
  async findByCode(professionCode: string): Promise<Profession | null> {
    return this.professionRepository.findOneBy({ professionCode });
  }
}
