import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReportArea } from './entities/report-area.entity';

@Injectable()
export class ReportAreaRepository {
  constructor(
    @InjectRepository(ReportArea)
    private readonly reportAreaRepository: Repository<ReportArea>,
  ) {}

  // 2. CRUD: Read (общие методы поиска)
  async findByWorkshopCode(workshopCode: string): Promise<ReportArea[]> {
    return this.reportAreaRepository.find({
      where: {
        workshop: { workshopCode },
      },
      relations: ['reportType', 'workshop'],
    });
  }
}
