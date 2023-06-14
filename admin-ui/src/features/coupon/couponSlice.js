import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import couponServices from './couponServices';

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getACoupon = createAsyncThunk(
  'coupon/get-a-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponServices.getACoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoupons = createAsyncThunk(
  'coupon/get-coupons',
  async (thunkAPI) => {
    try {
      return await couponServices.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  'coupon/create-coupon',
  async (coupon, thunkAPI) => {
    try {
      return await couponServices.createCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editACoupon = createAsyncThunk(
  'coupon/edit-a-coupon',
  async (couponData, thunkAPI) => {
    try {
      return await couponServices.editACoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACoupon = createAsyncThunk(
  'coupon/delete-a-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponServices.deleteACoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET COUPONS
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload.data;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET A COLOR
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentCoupon = action.payload.data;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE COUPON
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = [...state.coupons, action.payload.data];
        toast.success('Thêm phiếu giảm giá thành công!');
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm phiếu giảm giá thất bại!');
      })
      // EDIT A PRODUCT CATEGORY
      .addCase(editACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Sửa phiếu giảm giá thành công!');
      })
      .addCase(editACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa phiếu giảm giá thất bại!');
      })
      // DELETE A PRODUCT CATEGORY
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = state.coupons.filter(
          (c) => c._id !== action.payload.deletedCouponId
        );
        toast.success('Xóa phiếu giảm giá thành công!');
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa phiếu giảm giá thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
