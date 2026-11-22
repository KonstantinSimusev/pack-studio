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
    await this.buildChartReportResponse(res);
  }

  private async buildChartReportResponse(res: Response): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Рапорт');

      // Печать: А4, книжная, вписать по ширине, по центру листа
      worksheet.pageSetup = {
        paperSize: 9, // A4
        orientation: 'portrait',
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0, // 0 = по высоте не ограничиваем, сколько строк — столько страниц
        horizontalCentered: true,
        margins: {
          left: 0.4,
          right: 0.4, // узкие поля в дюймах ≈ 1 см
          top: 0.6,
          bottom: 0.6,
          header: 0.2,
          footer: 0.2,
        },
      };

      // Печатаем ровно используемый диапазон, ничего лишнего
      worksheet.pageSetup.printArea = 'A1:D33';

      // Ширины: суммарно ~17,6 см — влезает в А4 даже без fitToPage
      worksheet.getColumn(1).width = 20; // ≈ 3,7 см
      worksheet.getColumn(2).width = 25; // ≈ 4,6 см
      worksheet.getColumn(3).width = 25;
      worksheet.getColumn(4).width = 25;

      const FONT = { name: 'Verdana', size: 12 };
      const center = { vertical: 'middle', horizontal: 'center' } as const;
      // Матово-серый для линий, вместо чёрного
      const HAIR = { style: 'hair', color: { argb: 'FFBFBFBF' } } as const;

      // Хелпер: шапка блока — высота как у всех, жирная, тонкая линия снизу
      const styleHeader = (r: number): void => {
        const row = worksheet.getRow(r);
        row.height = 17; // 0,6 см, как у обычных строк
        row.font = { ...FONT, bold: true };
        row.alignment = center;
        row.eachCell((cell) => {
          cell.border = { bottom: HAIR };
        });
      };

      // Хелпер: Итого — высота как у всех, жирная, тонкая линия сверху
      const styleTotal = (r: number): void => {
        const row = worksheet.getRow(r);
        row.height = 17; // 0,6 см, как у обычных строк
        row.font = { ...FONT, bold: true };
        row.alignment = center;
        row.eachCell((cell) => {
          cell.border = { top: HAIR };
        });
      };

      // Заголовок всей страницы: А1, Verdana 14, жирный, прижат влево
      worksheet.getCell('A1').value = 'ЦУМП ПАО "ММК"';
      worksheet.getCell('A1').font = { name: 'Verdana', size: 14, bold: true };
      worksheet.getCell('A1').alignment = {
        horizontal: 'left',
        vertical: 'middle',
      };

      // Вся суть файла — один массив: [заголовок блока, [[точка, значение], ...]]
      // null = прочерк. TODO: заменить на данные из teamShiftService
      const sections: Array<[string, Array<[string, number | null]>]> = [
        [
          'Производство',
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
          [
            ['ЛУР', null],
            ['1 очередь', 123],
            ['2 очередь', 23],
            ['3 очередь', 12],
          ],
        ],
        [
          'Отгрузка',
          [
            ['Ж/д тупик № 6', null],
            ['Ж/д тупик № 7', 12],
            ['Ж/д тупик № 8', 12],
            ['Ж/д тупик № 10', 12],
          ],
        ],
        [
          'Остатки',
          [
            ['1 очередь', 123],
            ['2 очередь', 23],
            ['3 очередь', 12],
          ],
        ],
      ];

      const dash = (v: number | null): number | string => v ?? '-';
      let r = 4; // А1 — заголовок, 2–3 — пустые, таблица с А4

      for (const [title, rows] of sections) {
        // Шапка блока
        worksheet.getRow(r).values = [
          title,
          '22 ноя см2 бр2',
          '23 ноя см1 бр4',
          'Сутки',
        ];
        styleHeader(r);
        r += 1;

        // Строки точек: две смены и сумма за сутки
        let total = 0;

        for (const [name, v] of rows) {
          const row = worksheet.getRow(r);
          row.values = [name, dash(v), dash(v), v === null ? '-' : v * 2];
          row.height = 17; // 0,6 см
          row.font = FONT; // без bold
          row.alignment = center;
          total += v ?? 0;
          r += 1;
        }

        // Итог по блоку — жирный, как шапка
        worksheet.getRow(r).values = ['', '', 'Итого:', total];
        styleTotal(r);
        r += 3; // две пустые строки между блоками
      }

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
