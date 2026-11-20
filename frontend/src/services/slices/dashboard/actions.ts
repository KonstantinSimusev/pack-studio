import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAbsence } from '../../../utils/api.interfaces';

import { getAbsenceSummaryApi } from '../../../utils/api/dashboard.api';
import { delay } from '../../../utils/utils';

export const getAbsenceSummary = createAsyncThunk<IAbsence[], void>(
  'dashboard/get-absence-summary',
  async (): Promise<IAbsence[]> => {
    try {
      const response = await getAbsenceSummaryApi();
      await delay(1000);
      return response;
    } catch (error) {
      await delay(1000);
      if (error instanceof Error) {
        throw error; // передаём точное сообщение от бэкенда
      }

      throw new Error('Что-то пошло не так');
    }
  },
);
