import { createSlice } from '@reduxjs/toolkit';

import {
  ILastShift,
  IShift,
  IShiftReport,
} from '../../../utils/api.interfaces';

import {
  createShift,
  getLastShift,
  getLastShiftReports,
  getShiftById,
} from './actions';

interface IShiftState {
  // Создание смены
  isCreateShiftLoading: boolean;
  createShiftError: string | null;

  // Смена по ID (детальная)
  shift: IShift | null;
  isGetShiftLoading: boolean;
  getShiftError: string | null;

  // Последняя смена — свой домен со своими состояниями
  lastShift: ILastShift | null;
  isLastShiftLoaded: boolean; // ответ по последней смене получен (любой исход)
  isGetLastShiftLoading: boolean;
  getLastShiftError: string | null;

  // Последняя смена с рапортами — свой домен со своими состояниями
  lastShiftReports: IShiftReport | null;
  isLastShiftReportsLoaded: boolean; // ответ по последней смене с рапортами получен (любой исход)
  isGetLastShiftReportsLoading: boolean;
  getLastShiftReportsError: string | null;
}

const initialState: IShiftState = {
  isCreateShiftLoading: false,
  createShiftError: null,

  shift: null,
  isGetShiftLoading: false,
  getShiftError: null,

  lastShift: null,
  isLastShiftLoaded: false,
  isGetLastShiftLoading: false,
  getLastShiftError: null,

  lastShiftReports: null,
  isLastShiftReportsLoaded: false,
  isGetLastShiftReportsLoading: false,
  getLastShiftReportsError: null,
};

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    clearCreateShiftError: (state) => {
      state.createShiftError = null;
    },
    clearShift: (state) => {
      state.shift = null;
    },
    clearLastShift: (state) => {
      state.lastShift = null;
      state.isLastShiftLoaded = false; // вернулись в «неизвестно»
    },
    clearGetShiftError: (state) => {
      state.getShiftError = null;
    },
    clearGetLastShiftError: (state) => {
      state.getLastShiftError = null;
    },
    clearLastShiftReports: (state) => {
      state.lastShiftReports = null;
      state.isLastShiftReportsLoaded = false; // вернулись в «неизвестно»
    },
  },
  selectors: {
    selectIsCreateShiftLoading: (state: IShiftState) =>
      state.isCreateShiftLoading,
    selectCreateShiftError: (state: IShiftState) => state.createShiftError,

    selectShift: (state: IShiftState) => state.shift,
    selectIsGetShiftLoading: (state: IShiftState) => state.isGetShiftLoading,
    selectGetShiftError: (state: IShiftState) => state.getShiftError,

    selectLastShift: (state: IShiftState) => state.lastShift,
    selectIsLastShiftLoaded: (state: IShiftState) => state.isLastShiftLoaded,
    selectIsGetLastShiftLoading: (state: IShiftState) =>
      state.isGetLastShiftLoading,
    selectGetLastShiftError: (state: IShiftState) => state.getLastShiftError,

    selectLastShiftReports: (state: IShiftState) => state.lastShiftReports,
    selectIsLastShiftReportsLoaded: (state: IShiftState) =>
      state.isLastShiftReportsLoaded,
    selectIsGetLastShiftReportsLoading: (state: IShiftState) =>
      state.isGetLastShiftReportsLoading,
    selectGetLastShiftReportsError: (state: IShiftState) =>
      state.getLastShiftReportsError,
  },
  extraReducers: (builder) => {
    builder
      // Создание смены
      .addCase(createShift.pending, (state) => {
        state.isCreateShiftLoading = true;
        state.createShiftError = null;
      })
      .addCase(createShift.fulfilled, (state) => {
        state.isCreateShiftLoading = false;
        state.createShiftError = null;
      })
      .addCase(createShift.rejected, (state, action) => {
        state.isCreateShiftLoading = false;
        state.createShiftError =
          action.error.message ?? 'Не удалось создать смену';
      })
      // Получение смены по ID — пишет только в shift
      .addCase(getShiftById.pending, (state) => {
        state.isGetShiftLoading = true;
        state.getShiftError = null;
      })
      .addCase(getShiftById.fulfilled, (state, action) => {
        state.isGetShiftLoading = false;
        state.getShiftError = null;
        state.shift = action.payload;
      })
      .addCase(getShiftById.rejected, (state, action) => {
        state.isGetShiftLoading = false;
        state.getShiftError =
          action.error.message ?? 'Не удалось получить смену';
      })
      // Получение последней смены — пишет только в lastShift
      .addCase(getLastShift.pending, (state) => {
        state.isGetLastShiftLoading = true;
        state.getLastShiftError = null;
      })
      .addCase(getLastShift.fulfilled, (state, action) => {
        state.isGetLastShiftLoading = false;
        state.getLastShiftError = null;
        state.lastShift = action.payload; // смена или null, если актуальной нет
        state.isLastShiftLoaded = true; // <- ключ
      })
      .addCase(getLastShift.rejected, (state, action) => {
        state.isGetLastShiftLoading = false;
        state.getLastShiftError =
          action.error.message ?? 'Не удалось получить последнюю смену';
        state.isLastShiftLoaded = true; // ошибка — тоже завершение
      })
      // Получение последней смены с рапортами — пишет только в lastShiftReports
      .addCase(getLastShiftReports.pending, (state) => {
        state.isGetLastShiftReportsLoading = true;
        state.getLastShiftReportsError = null;
      })
      .addCase(getLastShiftReports.fulfilled, (state, action) => {
        state.isGetLastShiftReportsLoading = false;
        state.getLastShiftReportsError = null;
        state.lastShiftReports = action.payload; // смена с рапортами или null, если актуальной нет
        state.isLastShiftReportsLoaded = true; // <- ключ
      })
      .addCase(getLastShiftReports.rejected, (state, action) => {
        state.isGetLastShiftReportsLoading = false;
        state.getLastShiftReportsError =
          action.error.message ??
          'Не удалось получить последнюю смену с рапортами';
        state.isLastShiftReportsLoaded = true; // ошибка — тоже завершение
      });
  },
});

export const {
  clearShift,
  clearLastShift,
  clearLastShiftReports,
  clearCreateShiftError,
  clearGetShiftError,
  clearGetLastShiftError,
} = shiftSlice.actions;

export const {
  selectIsCreateShiftLoading,
  selectCreateShiftError,
  selectShift,
  selectIsGetShiftLoading,
  selectGetShiftError,
  selectLastShift,
  selectIsLastShiftLoaded,
  selectIsGetLastShiftLoading,
  selectGetLastShiftError,
  selectLastShiftReports,
  selectIsLastShiftReportsLoaded,
  selectIsGetLastShiftReportsLoading,
  selectGetLastShiftReportsError,
} = shiftSlice.selectors;
