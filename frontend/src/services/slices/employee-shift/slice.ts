import { createSlice } from '@reduxjs/toolkit';

import {
  createEmployeeShift,
  deleteEmployeeShift,
  updateEmployeeShift,
} from './actions';

interface IEmployeeShiftState {
  addedEmployeeShiftId: string | null;

  isCreateEmployeeShiftLoading: boolean;
  createEmployeeShiftError: string | null;

  isUpdateEmployeeShiftLoading: boolean;
  updateEmployeeShiftError: string | null;

  isDeleteEmployeeShiftLoading: boolean;
  deleteEmployeeShiftError: string | null;
}

const initialState: IEmployeeShiftState = {
  addedEmployeeShiftId: null,

  isCreateEmployeeShiftLoading: false,
  createEmployeeShiftError: null,

  isUpdateEmployeeShiftLoading: false,
  updateEmployeeShiftError: null,

  isDeleteEmployeeShiftLoading: false,
  deleteEmployeeShiftError: null,
};

export const employeeShiftSlice = createSlice({
  name: 'employeeShift',
  initialState,
  reducers: {
    clearAddedEmployeeShiftId: (state) => {
      state.addedEmployeeShiftId = null;
    },
    clearCreateEmployeeShift: (state) => {
      state.isCreateEmployeeShiftLoading = false;
      state.createEmployeeShiftError = null;
    },
    clearUpdateEmployeeShift: (state) => {
      state.isUpdateEmployeeShiftLoading = false;
      state.updateEmployeeShiftError = null;
    },
    clearDeleteEmployeeShift: (state) => {
      state.isDeleteEmployeeShiftLoading = false;
      state.deleteEmployeeShiftError = null;
    },
  },
  selectors: {
    selectAddedEmployeeShiftId: (state: IEmployeeShiftState) =>
      state.addedEmployeeShiftId,

    selectIsCreateEmployeeShiftLoading: (state: IEmployeeShiftState) =>
      state.isCreateEmployeeShiftLoading,
    selectCreateEmployeeShiftError: (state: IEmployeeShiftState) =>
      state.createEmployeeShiftError,

    selectIsUpdateEmployeeShiftLoading: (state: IEmployeeShiftState) =>
      state.isUpdateEmployeeShiftLoading,
    selectUpdateEmployeeShiftError: (state: IEmployeeShiftState) =>
      state.updateEmployeeShiftError,

    selectIsDeleteEmployeeShiftLoading: (state: IEmployeeShiftState) =>
      state.isDeleteEmployeeShiftLoading,
    selectDeleteEmployeeShiftError: (state: IEmployeeShiftState) =>
      state.deleteEmployeeShiftError,
  },
  extraReducers: (builder) => {
    builder
      // Обработчики createEmployeeShift
      .addCase(createEmployeeShift.pending, (state) => {
        state.isCreateEmployeeShiftLoading = true;
        state.createEmployeeShiftError = null;
      })
      .addCase(createEmployeeShift.fulfilled, (state, action) => {
        state.isCreateEmployeeShiftLoading = false;
        state.createEmployeeShiftError = null;
        state.addedEmployeeShiftId = action.payload.employeeShiftId ?? null;
      })
      .addCase(createEmployeeShift.rejected, (state, action) => {
        state.isCreateEmployeeShiftLoading = false;
        state.createEmployeeShiftError =
          action.error.message ?? 'Не удалось создать смену сотрудника';
      })

      // Обработчики updateEmployeeShift — по аналогии
      .addCase(updateEmployeeShift.pending, (state) => {
        state.isUpdateEmployeeShiftLoading = true;
        state.updateEmployeeShiftError = null;
      })
      .addCase(updateEmployeeShift.fulfilled, (state) => {
        state.isUpdateEmployeeShiftLoading = false;
        state.updateEmployeeShiftError = null;
      })
      .addCase(updateEmployeeShift.rejected, (state, action) => {
        state.isUpdateEmployeeShiftLoading = false;
        state.updateEmployeeShiftError =
          action.error.message ?? 'Не удалось обновить смену сотрудника';
      })

      // Обработчики deleteEmployeeShift
      .addCase(deleteEmployeeShift.pending, (state) => {
        state.isDeleteEmployeeShiftLoading = true;
        state.deleteEmployeeShiftError = null;
      })
      .addCase(deleteEmployeeShift.fulfilled, (state) => {
        state.isDeleteEmployeeShiftLoading = false;
        state.deleteEmployeeShiftError = null;
      })
      .addCase(deleteEmployeeShift.rejected, (state, action) => {
        state.isDeleteEmployeeShiftLoading = false;
        state.deleteEmployeeShiftError =
          action.error.message ?? 'Не удалось удалить смену сотрудника';
      });
  },
});

// Экспорт действий
export const {
  clearAddedEmployeeShiftId,
  clearCreateEmployeeShift,
  clearUpdateEmployeeShift,
  clearDeleteEmployeeShift,
} = employeeShiftSlice.actions;

// Экспорт селекторов
export const {
  selectAddedEmployeeShiftId,
  selectIsCreateEmployeeShiftLoading,
  selectCreateEmployeeShiftError,
  selectIsUpdateEmployeeShiftLoading,
  selectUpdateEmployeeShiftError,
  selectIsDeleteEmployeeShiftLoading,
  selectDeleteEmployeeShiftError,
} = employeeShiftSlice.selectors;
