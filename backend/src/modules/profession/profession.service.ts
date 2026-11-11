import { Injectable, NotFoundException } from '@nestjs/common';

import { Profession } from './entities/profession.entity';
import { ProfessionRepository } from './profession.repository';

@Injectable()
export class ProfessionService {
  constructor(private readonly professionRepository: ProfessionRepository) {}

  async getProfessionByCode(professionCode: string): Promise<Profession> {
    const profession =
      await this.professionRepository.findByCode(professionCode);

    if (!profession) {
      throw new NotFoundException(`Профессия ${professionCode} не найдена`);
    }

    return profession;
  }
}
