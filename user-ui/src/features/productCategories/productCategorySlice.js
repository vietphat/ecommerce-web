import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { productCategoryServices } from './productCategoryServices';

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getProductCategories = createAsyncThunk(
  'product-category/get-all',
  async (thunkAPI) => {
    try {
      return await productCategoryServices.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LẤY TẤT CẢ LOẠI SẢN PHẨM
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload.data;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productCategorySlice.reducer;
