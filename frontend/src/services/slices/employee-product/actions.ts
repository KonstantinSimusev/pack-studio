import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ICreateEmployeeProduct,
  ISuccess,
} from '../../../utils/api.interfaces';

import { createEmployeeProductApi } from '../../../utils/api/employee-product.api';
import { delay } from '../../../utils/utils';

export const createEmployeeProduct = createAsyncThunk<
  ISuccess,
  ICreateEmployeeProduct
>(
  'employeeProducts/create',
  async (data: ICreateEmployeeProduct): Promise<ISuccess> => {
    try {
      const response = await createEmployeeProductApi(data);
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
