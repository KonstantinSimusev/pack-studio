import { createAsyncThunk } from '@reduxjs/toolkit';

import { ISuccess, IUpdateReport } from '../../../utils/api.interfaces';

import { updateReportApi } from '../../../utils/api/report.api';
// import { delay } from '../../../utils/utils';

export const updateReport = createAsyncThunk<ISuccess, IUpdateReport>(
  'report/update',
  async (data: IUpdateReport): Promise<ISuccess> => {
    try {
      const response = await updateReportApi(data);
      // await delay(1000);
      return response;
    } catch (error) {
      // await delay(1000);
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Что-то пошло не так');
    }
  },
);

// Добавляем задержку кода
// await delay(1000);
