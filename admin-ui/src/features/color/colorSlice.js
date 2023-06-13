import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import colorServices from './colorServices';
import { toast } from 'react-toastify';

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

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
        toast.success('Thêm màu thành công!');
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Thêm màu thất bại!`);
      });
  },
});

export default colorSlice.reducer;
