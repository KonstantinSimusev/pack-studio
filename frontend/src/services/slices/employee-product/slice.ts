import { createSlice } from '@reduxjs/toolkit';

import { createEmployeeProduct } from './actions';

interface IEmployeeProductState {
  // Создание продукции
  isCreateEmployeeProductLoading: boolean;
  createEmployeeProductError: string | null;
}

const initialState: IEmployeeProductState = {
  isCreateEmployeeProductLoading: false,
  createEmployeeProductError: null,
};

export const employeeProductSlice = createSlice({
  name: 'employeeProduct',
  initialState,
  reducers: {
    clearCreateEmployeeProductError: (state) => {
      state.createEmployeeProductError = null;
    },
  },
  selectors: {
    selectIsCreateEmployeeProductLoading: (state: IEmployeeProductState) =>
      state.isCreateEmployeeProductLoading,
    selectCreateEmployeeProductError: (state: IEmployeeProductState) =>
      state.createEmployeeProductError,
  },
  extraReducers: (builder) => {
    builder
      // Создание продукции
      .addCase(createEmployeeProduct.pending, (state) => {
        state.isCreateEmployeeProductLoading = true;
        state.createEmployeeProductError = null;
      })
      .addCase(createEmployeeProduct.fulfilled, (state) => {
        state.isCreateEmployeeProductLoading = false;
        state.createEmployeeProductError = null;
      })
      .addCase(createEmployeeProduct.rejected, (state, action) => {
        state.isCreateEmployeeProductLoading = false;
        state.createEmployeeProductError =
          action.error.message ?? 'Не удалось создать продукцию';
      });
  },
});

export const { clearCreateEmployeeProductError } = employeeProductSlice.actions;

export const {
  selectIsCreateEmployeeProductLoading,
  selectCreateEmployeeProductError,
} = employeeProductSlice.selectors;
