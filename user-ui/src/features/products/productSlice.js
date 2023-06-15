import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { productServices } from './productServices';

const initialState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getAllProducts = createAsyncThunk(
  'product/get-all',
  async (thunkAPI) => {
    try {
      return await productServices.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProducts = createAsyncThunk(
  'product/get',
  async (productId, thunkAPI) => {
    try {
      return await productServices.getAProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LẤY TẤT CẢ SẢN PHẨM TỪ DB
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // XEM CHI TIẾT SẢN PHẨM
      .addCase(getAProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.currentProduct = action.payload.data;
      })
      .addCase(getAProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
