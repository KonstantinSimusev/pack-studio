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
  // private getMockReport(): IReportList {
  //   const chart = (id: string, title: string, count: number): IReportChart => ({
  //     id,
  //     title,
  //     count,
  //   });

  //   return {
  //     workshopName: 'УУМ ЛПЦ-11',
  //     shiftDate: new Date(2026, 10, 21), // 21 ноября
  //     shiftCode: 2,
  //     teamNumber: 4,
  //     production: [
  //       chart('p1', 'АНГЦ', 92),
  //       chart('p2', 'АНО', 53),
  //       chart('p3', 'АИ', 19),
  //       chart('p4', 'АНГЦ-3', 104),
  //     ],
  //     shipment: [
  //       chart('s1', 'Туп 6', 2),
  //       chart('s2', 'Туп 7', 15),
  //       chart('s3', 'Туп 10', 9),
  //     ],
  //     pack: [
  //       chart('pk1', 'ЛУР', 100),
  //       chart('pk2', '2 оч', 68),
  //       chart('pk3', '3 оч', 102),
  //     ],
  //     residue: [chart('r1', '2 оч', 25)],
  //     packLocations: [],
  //     lurLocations: [],
  //     fixLocations: [],
  //     detailLocations: [],
  //     professions: [],
  //     isReady: true,
  //   };
  // }

  async downloadExcelReport(shiftId: string, res: Response): Promise<void> {
    // 1. Данные — сейчас из мока, потом из шифт-сервиса
    // const report: IReportList | null = this.getMockReport();

    // 2. Формируем файл
    await this.buildChartReportResponse(res);
  }

  private async buildChartReportResponse(res: Response): Promise<void> {
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

      // === МОК ===
      const report = {
        workshopName: 'УУМ ЛПЦ-11',
        shiftDate: new Date(2026, 10, 22),
        shiftCode: 2,
        teamNumber: 2,
      };

      // null = прочерк; второе поле — единица измерения блока
      const sections: Array<[string, string, Array<[string, number | null]>]> =
        [
          [
            'Производство',
            'шт',
            [
              ['СТАН-2000', null],
              ['АНГЦ', 123],
              ['АНО-ГЦ', 23],
              ['АИ', 12],
              ['АНГЦ-3', 103],
            ],
          ],
          [
            'Упаковка',
            'шт',
            [
              ['ЛУР', null],
              ['1 очередь', 123],
              ['2 очередь', 23],
              ['3 очередь', 12],
            ],
          ],
          [
            'Отгрузка',
            'ваг',
            [
              ['Ж/д тупик № 6', null],
              ['Ж/д тупик № 7', 12],
              ['Ж/д тупик № 8', 12],
              ['Ж/д тупик № 10', 12],
            ],
          ],
          [
            'Остатки',
            'шт',
            [
              ['1 очередь', null],
              ['2 очередь', 12],
              ['3 очередь', null],
            ],
          ],
        ];

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
      for (const [title, unit, rows] of sections) {
        worksheet.getRow(r).values = [title, unit];
        styleHeader(r);
        r += 1;

        let total = 0;

        for (const [name, v] of rows) {
          worksheet.getRow(r).values = [name, v ?? '-'];
          styleDataRow(r);
          total += v ?? 0;
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
