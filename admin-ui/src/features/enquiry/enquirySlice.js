import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import enquiryServices from './enquiryServices';

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getEnquiries = createAsyncThunk(
  'enquiry/get-enquiries',
  async (thunkAPI) => {
    try {
      return await enquiryServices.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload.data;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default enquirySlice.reducer;
