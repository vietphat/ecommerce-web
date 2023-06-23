import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import uploadServices from './uploadServices';

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('reset_state');

export const uploadImg = createAsyncThunk(
  'upload/images',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();

      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i]);
      }

      return await uploadServices.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImg = createAsyncThunk(
  'upload/delete-image',
  async (publicId, thunkAPI) => {
    try {
      return await uploadServices.deleteImg(publicId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // UPLOAD IMAGE
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload.data;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // DELETE IMAGE
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (img) => img.public_id !== action.payload.publicId
        );
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default uploadSlice.reducer;
