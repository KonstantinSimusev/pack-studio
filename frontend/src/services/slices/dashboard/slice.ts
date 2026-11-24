import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IAbsence,
  IReportList,
  IHomeTeam,
} from '../../../utils/api.interfaces';

import {
  getAbsenceSummary,
  getHomeTeams,
  getLastShiftWithChartReport,
} from './actions';

interface IDashboardState {
  homeTeams: IHomeTeam[] | null;
  isGetHomeTeamsLoading: boolean;

  absenceSummary: IAbsence[] | null;
  isGetAbsenceSummaryLoading: boolean;

  lastShiftWithChartReport: IReportList | null;
  isLastShiftWithChartReportLoaded: boolean; // ответ по последней смене с графиком получен (любой исход)
  isGetLastShiftWithChartReportLoading: boolean;
}

const initialState: IDashboardState = {
  homeTeams: null,
  isGetHomeTeamsLoading: false,

  absenceSummary: null,
  isGetAbsenceSummaryLoading: false,

  lastShiftWithChartReport: null,
  isLastShiftWithChartReportLoaded: false,
  isGetLastShiftWithChartReportLoading: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearHomeTeams: (state) => {
      state.homeTeams = null;
    },
    clearAbsenceSummary: (state) => {
      state.absenceSummary = null;
    },
    clearLastShiftWithChartReport: (state) => {
      state.lastShiftWithChartReport = null;
      state.isLastShiftWithChartReportLoaded = false; // вернулись в «неизвестно»
    },
  },
  selectors: {
    selectHomeTeams: (state: IDashboardState) => state.homeTeams,
    selectIsGetHomeTeamsLoading: (state: IDashboardState) =>
      state.isGetHomeTeamsLoading,

    selectAbsenceSummary: (state: IDashboardState) => state.absenceSummary,
    selectIsGetAbsenceSummaryLoading: (state: IDashboardState) =>
      state.isGetAbsenceSummaryLoading,

    selectLastShiftWithChartReport: (state: IDashboardState) =>
      state.lastShiftWithChartReport,
    selectIsLastShiftWithChartReportLoaded: (state: IDashboardState) =>
      state.isLastShiftWithChartReportLoaded,
    selectIsGetLastShiftWithChartReportLoading: (state: IDashboardState) =>
      state.isGetLastShiftWithChartReportLoading,
  },
  extraReducers: (builder) => {
    builder
      // Обработчик для getHomeTeams
      .addCase(getHomeTeams.pending, (state) => {
        state.isGetHomeTeamsLoading = true;
      })
      .addCase(
        getHomeTeams.fulfilled,
        (state, action: PayloadAction<IHomeTeam[]>) => {
          state.homeTeams = action.payload;
          state.isGetHomeTeamsLoading = false;
        },
      )
      .addCase(getHomeTeams.rejected, (state) => {
        state.isGetHomeTeamsLoading = false;
      })

      // Обработчик для getAbsenceSummary
      .addCase(getAbsenceSummary.pending, (state) => {
        state.isGetAbsenceSummaryLoading = true;
      })
      .addCase(
        getAbsenceSummary.fulfilled,
        (state, action: PayloadAction<IAbsence[]>) => {
          state.absenceSummary = action.payload;
          state.isGetAbsenceSummaryLoading = false;
        },
      )
      .addCase(getAbsenceSummary.rejected, (state) => {
        state.isGetAbsenceSummaryLoading = false;
      })

      // Обработчик для getLastShiftWithChartReport
      .addCase(getLastShiftWithChartReport.pending, (state) => {
        state.isGetLastShiftWithChartReportLoading = true;
      })
      .addCase(
        getLastShiftWithChartReport.fulfilled,
        (state, action: PayloadAction<IReportList | null>) => {
          state.lastShiftWithChartReport = action.payload;
          state.isGetLastShiftWithChartReportLoading = false;
          state.isLastShiftWithChartReportLoaded = true; // <- ключ
        },
      )
      .addCase(getLastShiftWithChartReport.rejected, (state) => {
        state.isGetLastShiftWithChartReportLoading = false;
        state.isLastShiftWithChartReportLoaded = true; // ошибка — тоже завершение
      });
  },
});

export const {
  clearHomeTeams,
  clearAbsenceSummary,
  clearLastShiftWithChartReport,
} = dashboardSlice.actions;

export const {
  selectHomeTeams,
  selectIsGetHomeTeamsLoading,
  selectAbsenceSummary,
  selectIsGetAbsenceSummaryLoading,
  selectLastShiftWithChartReport,
  selectIsLastShiftWithChartReportLoaded,
  selectIsGetLastShiftWithChartReportLoading,
} = dashboardSlice.selectors;
