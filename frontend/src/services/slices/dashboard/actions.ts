import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IAbsence,
  IChartReportList,
  IHomeTeam,
} from '../../../utils/api.interfaces';

import {
  getAbsenceSummaryApi,
  getHomeTeamsApi,
  getLastShiftWithChartReportApi,
} from '../../../utils/api/dashboard.api';
import { delay } from '../../../utils/utils';

export const getHomeTeams = createAsyncThunk<IHomeTeam[], void>(
  'dashboard/get-home-teams',
  async (): Promise<IHomeTeam[]> => {
    try {
      const response = await getHomeTeamsApi();
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

export const getAbsenceSummary = createAsyncThunk<IAbsence[], void>(
  'dashboard/get-absence-summary',
  async (): Promise<IAbsence[]> => {
    try {
      const response = await getAbsenceSummaryApi();
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

export const getLastShiftWithChartReport = createAsyncThunk<
  IChartReportList | null,
  number
>(
  'team-shift/get-last-shift-with-chart-report',
  async (teamNumber: number): Promise<IChartReportList | null> => {
    try {
      const response = await getLastShiftWithChartReportApi(teamNumber);
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
