import { Injectable, NotFoundException } from '@nestjs/common';

import { ReportArea } from './entities/report-area.entity';
import { ReportAreaRepository } from './report-area.repository';

@Injectable()
export class ReportAreaService {
  constructor(private readonly reportAreaRepository: ReportAreaRepository) {}

  // async getReportAreaByCode(areaCode: string): Promise<ReportArea> {
  //   const reportArea = await this.reportAreaRepository.findByCode(areaCode);

  //   if (!reportArea) {
  //     throw new NotFoundException(`Цех ${areaCode} не найден`);
  //   }

  //   return reportArea;
  // }
}
