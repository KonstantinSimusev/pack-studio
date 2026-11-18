import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Report } from './entities/report.entity';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  // 1. CRUD: Create
  async create(data: Partial<Report>): Promise<Report> {
    const report = this.reportRepository.create(data);
    return this.reportRepository.save(report);
  }

  // 2. CRUD: Read (общие методы поиска)
  async findById(id: string): Promise<Report | null> {
    return this.reportRepository.findOneBy({ id });
  }

  // Возвращает все рапорты смены с участком и типом
  // async findAllByShift(shiftId: string): Promise<Report[]> {
  //   return this.reportRepository.find({
  //     where: {
  //       shift: { id: shiftId },
  //     },
  //     relations: {
  //       reportArea: {
  //         reportType: true,
  //       },
  //     },
  //     order: {
  //       reportArea: { areaCode: 'ASC' },
  //     },
  //   });
  // }

  // 3. CRUD: Update
  async save(report: Report): Promise<Report> {
    return this.reportRepository.save(report);
  }
}
