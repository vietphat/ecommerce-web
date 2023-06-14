import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import enquiryServices from './enquiryServices';
import { toast } from 'react-toastify';

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getAnEnquiry = createAsyncThunk(
  'enquiry/get-an-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.getAnEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const editAnEnquiry = createAsyncThunk(
  'enquiry/edit-an-enquiry',
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryServices.editAnEnquiry(enquiryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAnEnquiry = createAsyncThunk(
  'enquiry/delete-an-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.deleteAnEnquiry(id);
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
      // GET ALL ENQUIRIES
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
      })
      // GET AN ENQUIRIES
      .addCase(getAnEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentEnquiry = action.payload.data;
      })
      .addCase(getAnEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // EDIT AN ENQUIRY
      .addCase(editAnEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAnEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const { data: updatedEnquiry } = action.payload;
        const updatedEnquiryIndex = state.enquiries.findIndex(
          (e) => e._id === updatedEnquiry._id
        );
        state.enquiries[updatedEnquiryIndex] = updatedEnquiry;

        toast.success('Cập nhật trạng thái thành công!');
      })
      .addCase(editAnEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Cập nhật trạng thái thất bại!');
      })
      // DELETE AN ENQUIRY
      .addCase(deleteAnEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = state.enquiries.filter(
          (e) => e._id !== action.payload.deletedEnquiryId
        );
        toast.success('Xóa thắc mắc thành công!');
      })
      .addCase(deleteAnEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa thắc mắc thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
