import { createAsyncThunk } from '@reduxjs/toolkit';
import { downloadExcelReportApi } from '../../../utils/api/excel.api';
// import { delay } from '../../../utils/utils';

export const downloadExcelReport = createAsyncThunk(
  'report/downloadExcelReport',
  async (shiftId: string, { rejectWithValue }) => {
    try {
      // Получаем Blob напрямую из API (метод уже возвращает Promise<Blob>)
      const blob = await downloadExcelReportApi(shiftId);
      // await delay(1000);

      // Создаём URL для Blob
      const url = window.URL.createObjectURL(blob);

      // Создаём скрытую ссылку для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.xlsx';
      link.style.display = 'none';
      link.rel = 'noopener'; // Безопасность

      // Добавляем в DOM, кликаем и удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем URL (важно для памяти)
      window.URL.revokeObjectURL(url);

      return undefined; // Успех без данных
    } catch (error) {
      // await delay(1000);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка скачивания',
      );
    }
  },
);
