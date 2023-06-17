import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { orderServices } from './orderServices';

const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const resetOrder = createAction('order/reset');

export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, thunkAPI) => {
    try {
      return await orderServices.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  'order/get-my-orders',
  async (thunkAPI) => {
    try {
      return await orderServices.getMyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ĐẶT HÀNG
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = [...state.orders, action.payload.data];
        toast.success('Thanh toán thành công. Vui lòng kiểm tra mail');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.success('Thanh toán thất bại');
      })
      // LẤY THÔNG TIN CÁC ĐƠN HÀNG
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload.data;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orders = action.error;
      })
      .addCase(resetOrder, () => initialState);
  },
});

export default orderSlice.reducer;
