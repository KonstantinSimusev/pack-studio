import { Body, Controller, Put, UseGuards } from '@nestjs/common';

import { ISuccess } from '../../shared/interfaces/api.interface';
import { AuthGuard } from '../auth/guards/auth.guard';

import { ReportService } from './report.service';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Put()
  @UseGuards(AuthGuard)
  async updateReport(@Body() dto: UpdateReportDto): Promise<ISuccess> {
    return this.reportService.updateReport(dto);
  }
}
