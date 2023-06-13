import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productCategoryServices from './productCategoryServices';
import { toast } from 'react-toastify';

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getProductCategories = createAsyncThunk(
  'product-category/get-product-categories',
  async (thunkAPI) => {
    try {
      return await productCategoryServices.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  'product-category/create-product-category',
  async (productCategory, thunkAPI) => {
    try {
      return await productCategoryServices.createProductCategory(
        productCategory
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET PRODUCT CATEGORIES
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload.data;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE PRODUCT CATEGORIES
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = [
          ...state.productCategories,
          action.payload.data,
        ];
        toast.success('Thêm loại sản phẩm thành công!');
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Thêm loại sản phẩm thất bại!`);
      });
  },
});

export default productCategorySlice.reducer;
