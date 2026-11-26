import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import * as ExcelJS from 'exceljs-hardened';

import { IReportData } from '../../shared/interfaces/api.interface';
import { ShiftService } from '../shift/shift.service';

@Injectable()
export class ExcelService {
  constructor(private readonly shiftService: ShiftService) {}

  async downloadExcelReport(shiftId: string, res: Response): Promise<void> {
    // 1. Данные
    const report: IReportData =
      await this.shiftService.getShiftByIdWithExcelReport(shiftId);

    // 2. Формируем файл
    await this.buildChartReportResponse(report, res);
  }

  private async buildChartReportResponse(
    report: IReportData,
    res: Response,
  ): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Рапорт');

      worksheet.getColumn(1).width = 30;
      worksheet.getColumn(2).width = 8;

      const FONT = { name: 'Verdana', size: 12 };
      const left = { vertical: 'middle', horizontal: 'left' } as const;
      const right = { vertical: 'middle', horizontal: 'right' } as const;

      const ROW_HEIGHT = 15.03; // 0,53 см — строки данных
      const HEADER_HEIGHT = 17.01; // 0,6 см — шапки блоков
      const TOTAL_HEIGHT = 28.35; // 1 см — «Итого:»

      const GRAY = { style: 'thin', color: { argb: 'FFBFBFBF' } } as const;

      // Шапка блока: заголовок слева, единица справа, линия снизу
      const styleHeader = (r: number): void => {
        const row = worksheet.getRow(r);
        row.height = HEADER_HEIGHT;
        row.font = { ...FONT, bold: true };
        row.getCell(1).alignment = left;
        row.getCell(2).alignment = right;
        row.eachCell((cell) => {
          cell.border = { bottom: GRAY };
        });
      };

      // Строка данных: название слева, значение справа
      const styleDataRow = (r: number): void => {
        const row = worksheet.getRow(r);
        row.height = ROW_HEIGHT;
        row.font = FONT;
        row.getCell(1).alignment = left;
        row.getCell(2).alignment = right;
      };

      // Итого: «Итого:» прижато вправо в первой колонке, значение справа
      const styleTotal = (r: number): void => {
        const row = worksheet.getRow(r);
        row.height = TOTAL_HEIGHT;
        row.font = { ...FONT, bold: true };
        row.getCell(1).alignment = right;
        row.getCell(2).alignment = right;
        row.eachCell((cell) => {
          cell.border = { top: GRAY };
        });
      };

      // === Шапка листа ===
      let r = 1;

      worksheet.getCell(`A${r}`).value = 'ЦУМП ПАО "ММК"';
      worksheet.getCell(`A${r}`).font = {
        name: 'Verdana',
        size: 14,
        bold: true,
      };
      worksheet.getCell(`A${r}`).alignment = left;
      r += 1;

      worksheet.getCell(`A${r}`).value = report.workshopName;
      worksheet.getCell(`A${r}`).font = {
        name: 'Verdana',
        size: 12,
        bold: true,
      };
      worksheet.getCell(`A${r}`).alignment = left;
      r += 2; // две пустые строки

      const dateStr = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(report.shiftDate);

      worksheet.getCell(`A${r}`).value = dateStr;
      worksheet.getCell(`A${r}`).font = FONT;
      worksheet.getCell(`A${r}`).alignment = left;
      r += 1;

      worksheet.getCell(`A${r}`).value = `Смена ${report.shiftCode}`;
      worksheet.getCell(`A${r}`).font = FONT;
      worksheet.getCell(`A${r}`).alignment = left;
      r += 1;

      worksheet.getCell(`A${r}`).value = `Бригада ${report.teamNumber}`;
      worksheet.getCell(`A${r}`).font = FONT;
      worksheet.getCell(`A${r}`).alignment = left;
      r += 3; // две пустые строки перед таблицами

      // === Блоки ===
      for (const { title, unit, rows, total } of report.sections) {
        worksheet.getRow(r).values = [title, unit];
        styleHeader(r);
        r += 1;

        for (const rowData of rows) {
          worksheet.getRow(r).values = [rowData.name, rowData.value ?? '-'];
          styleDataRow(r);
          r += 1;
        }

        worksheet.getRow(r).values = ['Итого:', total];
        styleTotal(r);
        r += 3; // две пустые строки между блоками
      }

      const excelBuffer = await workbook.xlsx.writeBuffer();

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
