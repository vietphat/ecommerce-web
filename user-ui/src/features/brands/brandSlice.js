import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { brandServices } from './brandServices';

const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getBrands = createAsyncThunk('brand/get-all', async (thunkAPI) => {
  try {
    return await brandServices.getBrands();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LẤY TÁT CẢ THƯƠNG HIỆU
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload.data;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default brandSlice.reducer;
