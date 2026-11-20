import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAbsence } from '../../../utils/api.interfaces';

import { getAbsenceSummary } from './actions';

interface IDashboardState {
  absenceSummary: IAbsence[] | null;
  isGetAbsenceSummaryLoading: boolean;
}

const initialState: IDashboardState = {
  absenceSummary: null,
  isGetAbsenceSummaryLoading: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearAbsenceSummary: (state) => {
      state.absenceSummary = null;
    },
  },
  selectors: {
    selectAbsenceSummary: (state: IDashboardState) => state.absenceSummary,
    selectIsGetAbsenceSummaryLoading: (state: IDashboardState) =>
      state.isGetAbsenceSummaryLoading,
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearAbsenceSummary } = dashboardSlice.actions;

export const { selectAbsenceSummary, selectIsGetAbsenceSummaryLoading } =
  dashboardSlice.selectors;
