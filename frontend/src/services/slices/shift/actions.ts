import { createAsyncThunk } from '@reduxjs/toolkit';

import { ICreateShift, ILastShift, IShift, ISuccess } from '../../../utils/api.interfaces';

import {
  createShiftApi,
  getLastShiftApi,
  getShiftByIdApi,
  // getShiftsApi,
  // getShiftsByDateApi,
} from '../../../utils/api/shift.api';
import { delay } from '../../../utils/utils';

export const createShift = createAsyncThunk<ISuccess, ICreateShift>(
  'shifts/create',
  async (data: ICreateShift): Promise<ISuccess> => {
    try {
      const response = await createShiftApi(data);
      // await delay(1000);
      return response;
    } catch (error) {
      // await delay(1000);
      if (error instanceof Error) {
        throw error; // передаём точное сообщение от бэкенда
      }

      throw new Error('Что-то пошло не так');
    }
  },
);

export const getLastShift = createAsyncThunk<ILastShift | null, void>(
  'last-shift/get',
  async (): Promise<ILastShift | null> => {
    try {
      // Вызываем API функцию
      const response = await getLastShiftApi();
      // await delay(1000);
      return response;
    } catch (error) {
      // await delay(1000);
      if (error instanceof Error) {
        throw error; // передаём точное сообщение от бэкенда
      }

      throw new Error('Что-то пошло не так');
    }
  },
);

export const getShiftById = createAsyncThunk<IShift, string>(
  'shifts/getById',
  async (id: string) => {
    try {
      const response = await getShiftByIdApi(id);
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

// export const getShiftsByDate = createAsyncThunk<
//   IShift[],
//   { shiftDate: string }
// >('shifts/getByDate', async ({ shiftDate }): Promise<IShift[]> => {
//   try {
//     const response = await getShiftsByDateApi(shiftDate);
//     // await delay(1000);
//     return response;
//   } catch (error) {
//     // await delay(1000);
//     if (error instanceof Error) {
//       throw error; // передаём точное сообщение от бэкенда
//     }

//     throw new Error('Что-то пошло не так');
//   }
// });

// Добавляем задержку кода
// await delay(1000);
