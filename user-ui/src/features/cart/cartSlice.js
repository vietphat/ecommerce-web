import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { cartServices } from './cartServices';

const initialState = {
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getCart = createAsyncThunk('cart/get-cart', async (thunkAPI) => {
  try {
    return await cartServices.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk(
  'cart/add-cart',
  async (cartData, thunkAPI) => {
    try {
      return await cartServices.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LẤY THÔNG TIN GIỎ HÀNG
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = action.payload.data;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // THÊM VÀO GIỎ HÀNG
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Thêm vào giỏ hàng thành công!');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Thêm vào giỏ hàng thất bại!');
      });
  },
});

export default authSlice.reducer;
