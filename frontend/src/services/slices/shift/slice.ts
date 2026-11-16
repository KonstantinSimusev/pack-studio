import { createSlice } from '@reduxjs/toolkit';

import { ILastShift, IShift } from '../../../utils/api.interfaces';

import { createShift, getLastShift, getShiftById } from './actions';

interface IShiftState {
  // Смена по ID (детальная)
  shift: IShift | null;
  isGetShiftLoading: boolean;
  getShiftError: string | null;

  // Последняя смена — свой домен со своими состояниями
  lastShift: ILastShift | null;
  isLastShiftLoaded: boolean; // ответ по последней смене получен (любой исход)
  isGetLastShiftLoading: boolean;
  getLastShiftError: string | null;

  // Создание смены
  isCreateShiftLoading: boolean;
  createShiftError: string | null;
}

const initialState: IShiftState = {
  shift: null,
  isGetShiftLoading: false,
  getShiftError: null,

  lastShift: null,
  isLastShiftLoaded: false,
  isGetLastShiftLoading: false,
  getLastShiftError: null,

  isCreateShiftLoading: false,
  createShiftError: null,
};

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
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
    clearCreateShiftError: (state) => {
      state.createShiftError = null;
    },
  },
  selectors: {
    selectShift: (state: IShiftState) => state.shift,
    selectIsGetShiftLoading: (state: IShiftState) => state.isGetShiftLoading,
    selectGetShiftError: (state: IShiftState) => state.getShiftError,

    selectLastShift: (state: IShiftState) => state.lastShift,
    selectIsLastShiftLoaded: (state: IShiftState) => state.isLastShiftLoaded,
    selectIsGetLastShiftLoading: (state: IShiftState) =>
      state.isGetLastShiftLoading,
    selectGetLastShiftError: (state: IShiftState) => state.getLastShiftError,

    selectIsCreateShiftLoading: (state: IShiftState) =>
      state.isCreateShiftLoading,
    selectCreateShiftError: (state: IShiftState) => state.createShiftError,
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
      });
  },
});

export const {
  clearShift,
  clearLastShift,
  clearGetShiftError,
  clearGetLastShiftError,
  clearCreateShiftError,
} = shiftSlice.actions;

export const {
  selectShift,
  selectIsGetShiftLoading,
  selectGetShiftError,
  selectLastShift,
  selectIsLastShiftLoaded,
  selectIsGetLastShiftLoading,
  selectGetLastShiftError,
  selectIsCreateShiftLoading,
  selectCreateShiftError,
} = shiftSlice.selectors;
