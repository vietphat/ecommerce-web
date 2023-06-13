import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import colorServices from './colorServices';

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getColors = createAsyncThunk(
  'color/get-colors',
  async (thunkAPI) => {
    try {
      return await colorServices.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  'color/create-color',
  async (color, thunkAPI) => {
    try {
      return await colorServices.createColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET COLORS
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload.data;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE COLOR
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = [...state.colors, action.payload.data];
        toast.success('Thêm màu sản phẩm thành công!');
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm màu sản phẩm thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
