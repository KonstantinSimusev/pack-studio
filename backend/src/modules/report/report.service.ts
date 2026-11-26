import { Injectable, NotFoundException } from '@nestjs/common';

import { ISuccess } from '../../shared/interfaces/api.interface';
import { UpdateReportDto } from './dto/update-report.dto';

import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async updateReport(dto: UpdateReportDto): Promise<ISuccess> {
    // Получаем сущность по ID
    const report = await this.reportRepository.findById(dto.id);

    if (!report) {
      throw new NotFoundException(`Рапорт с ID ${dto.id} не найден`);
    }

    // Обновляем поле
    report.count = dto.count;

    // Сохраняем сущность
    await this.reportRepository.save(report);

    return {
      message: 'Рапорт успешно обновлен',
    };
  }
}
