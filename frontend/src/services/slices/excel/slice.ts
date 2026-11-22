import { createSlice } from '@reduxjs/toolkit';
import { downloadExcelReport } from './actions';

interface IExcelState {
  isReportDownloading: boolean;
  reportDownloadError: string | null;
}

const initialState: IExcelState = {
  isReportDownloading: false,
  reportDownloadError: null,
};

export const excelSlice = createSlice({
  name: 'excel',
  initialState,
  reducers: {
    clearReportDownloadError: (state) => {
      state.reportDownloadError = null;
    },
  },
  selectors: {
    selectIsReportDownloading: (state: IExcelState) =>
      state.isReportDownloading,
    selectReportDownloadError: (state: IExcelState) =>
      state.reportDownloadError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadExcelReport.pending, (state) => {
        state.isReportDownloading = true;
        state.reportDownloadError = null;
      })
      .addCase(downloadExcelReport.fulfilled, (state) => {
        state.isReportDownloading = false;
        state.reportDownloadError = null;
      })
      .addCase(downloadExcelReport.rejected, (state, action) => {
        state.isReportDownloading = false;
        state.reportDownloadError = action.payload as string;
      });
  },
});

export const { clearReportDownloadError } = excelSlice.actions;

export const { selectIsReportDownloading, selectReportDownloadError } =
  excelSlice.selectors;
