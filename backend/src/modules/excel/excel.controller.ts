import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';

import { Response, Request } from 'express';

import { ExcelService } from './excel.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetExcelReportDto } from './dto/get-excel-report.dto';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('reports/:shiftId')
  @UseGuards(AuthGuard)
  async downloadExcelReport(
    @Param() dto: GetExcelReportDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.excelService.downloadExcelReport(dto.shiftId, res);
  }
}
