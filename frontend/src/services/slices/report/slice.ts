import { createSlice } from '@reduxjs/toolkit';

import { updateReport } from './actions';

interface IReportState {
  isUpdateReportLoading: boolean;
  updateReportError: string | null;
}

const initialState: IReportState = {
  isUpdateReportLoading: false,
  updateReportError: null,
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearUpdateReport: (state) => {
      state.isUpdateReportLoading = false;
      state.updateReportError = null;
    },
  },
  selectors: {
    selectIsUpdateReportLoading: (state: IReportState) =>
      state.isUpdateReportLoading,
    selectUpdateReportError: (state: IReportState) => state.updateReportError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateReport.pending, (state) => {
        state.isUpdateReportLoading = true;
        state.updateReportError = null;
      })
      .addCase(updateReport.fulfilled, (state) => {
        state.isUpdateReportLoading = false;
        state.updateReportError = null;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.isUpdateReportLoading = false;
        state.updateReportError =
          action.error.message ?? 'Не удалось обновить рапорт';
      });
  },
});

// Экспорт действий
export const { clearUpdateReport } = reportSlice.actions;

// Экспорт селекторов
export const { selectIsUpdateReportLoading, selectUpdateReportError } =
  reportSlice.selectors;
