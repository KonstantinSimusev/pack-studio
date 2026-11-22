import * as ExcelJS from 'exceljs-hardened';

import { Injectable } from '@nestjs/common';

import { Response, Request } from 'express';
import {
  IReportChart,
  IReportList,
} from '../../shared/interfaces/api.interface';

@Injectable()
export class ExcelService {
  constructor() {} // позже: private readonly teamShiftService: TeamShiftService

  // === МОК-ДАННЫЕ: повторяют экран «УУМ ЛПЦ-11, 21 ноября, см 2, бр 4» ===
  // TODO: заменить на вызов teamShiftService.getLastShiftWithChartReport(teamNumber)
  private getMockReport(): IReportList {
    const chart = (id: string, title: string, count: number): IReportChart => ({
      id,
      title,
      count,
    });

    return {
      workshopName: 'УУМ ЛПЦ-11',
      shiftDate: new Date(2026, 10, 21), // 21 ноября
      shiftCode: 2,
      teamNumber: 4,
      production: [
        chart('p1', 'АНГЦ', 92),
        chart('p2', 'АНО', 53),
        chart('p3', 'АИ', 19),
        chart('p4', 'АНГЦ-3', 104),
      ],
      shipment: [
        chart('s1', 'Туп 6', 2),
        chart('s2', 'Туп 7', 15),
        chart('s3', 'Туп 10', 9),
      ],
      pack: [
        chart('pk1', 'ЛУР', 100),
        chart('pk2', '2 оч', 68),
        chart('pk3', '3 оч', 102),
      ],
      residue: [chart('r1', '2 оч', 25)],
      packLocations: [],
      lurLocations: [],
      fixLocations: [],
      detailLocations: [],
      professions: [],
      isReady: true,
    };
  }

  async downloadExcelReport(res: Response): Promise<void> {
    // 1. Данные — сейчас из мока, потом из шифт-сервиса
    const report: IReportList | null = this.getMockReport();

    // 2. Формируем файл
    await this.buildChartReportResponse(res, report);
  }

  private async buildChartReportResponse(
    res: Response,
    report: IReportList | null,
  ): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Рапорт');

      worksheet.getColumn(1).width = 25;
      worksheet.getCell('A1').value = 'Hello, World!';
      worksheet.getCell('A1').font = { name: 'Verdana', size: 12 };

      const excelBuffer = await workbook.xlsx.writeBuffer();

      // Настройка HTTP-ответа для скачивания файла
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="chart-report.xlsx"',
      );

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );

      res.send(excelBuffer);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      console.error(
        '[generateExcel] Ошибка при генерации Excel:',
        message,
        error,
      );

      throw new Error(`Не удалось сгенерировать Excel-файл: ${message}`);
    }
  }
}
