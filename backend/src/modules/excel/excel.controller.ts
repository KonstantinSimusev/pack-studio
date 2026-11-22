import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { Response, Request } from 'express';

import { ExcelService } from './excel.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('reports')
  @UseGuards(AuthGuard)
  async downloadExcelReport(@Res({ passthrough: true }) res: Response) {
    return await this.excelService.downloadExcelReport(res);
  }
}
