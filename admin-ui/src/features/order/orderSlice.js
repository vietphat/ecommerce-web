import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import orderServices from './orderServices';

const initialState = {
  orders: [],
  currentOrder: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getOrders = createAsyncThunk(
  'order/get-orders',
  async (thunkAPI) => {
    try {
      return await orderServices.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/get-order-by-id',
  async (orderId, thunkAPI) => {
    try {
      return await orderServices.getOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/update-order-status',
  async (data, thunkAPI) => {
    try {
      return await orderServices.updateOrderStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL ORDERS
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload.data;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
    // GET ORDER BY ID
    builder
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentOrder = action.payload.data;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
    // UPDATE ORDER STATUS
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const { data: newOrder } = action.payload;

        console.log(newOrder);

        const updatedOrderIndex = state.orders.findIndex(
          (order) => order._id === newOrder._id
        );

        state.orders[updatedOrderIndex] = newOrder;

        state.currentOrder = newOrder;

        toast.success('Cập nhật trạng thái đơn hàng thành công!');
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        toast.error('Cập nhật trạng thái đơn hàng thất bại!');
      });
  },
});

export default orderSlice.reducer;
