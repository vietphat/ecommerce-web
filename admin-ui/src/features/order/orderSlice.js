import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import orderServices from './orderServices';

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getOrders = createAsyncThunk(
  'order/get-orders',
  async (jwt, thunkAPI) => {
    try {
      return await orderServices.getOrders(jwt);
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
  },
});

export default orderSlice.reducer;
