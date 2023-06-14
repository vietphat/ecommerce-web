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

export const getAColor = createAsyncThunk(
  'color/get-a-color',
  async (id, thunkAPI) => {
    try {
      return await colorServices.getAColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const editAColor = createAsyncThunk(
  'color/edit-a-color',
  async (colorData, thunkAPI) => {
    try {
      return await colorServices.editAColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAColor = createAsyncThunk(
  'color/delete-a-color',
  async (id, thunkAPI) => {
    try {
      return await colorServices.deleteAColor(id);
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
      // GET A COLOR
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentColor = action.payload.data;
      })
      .addCase(getAColor.rejected, (state, action) => {
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
      // EDIT A PRODUCT CATEGORY
      .addCase(editAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Sửa màu thành công!');
      })
      .addCase(editAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa màu thất bại!');
      })
      // DELETE A PRODUCT CATEGORY
      .addCase(deleteAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = state.colors.filter(
          (c) => c._id !== action.payload.deletedColorId
        );
        toast.success('Xóa màu thành công!');
      })
      .addCase(deleteAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa màu thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
