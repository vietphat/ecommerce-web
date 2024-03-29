import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { cartServices } from './cartServices';

const initialState = {
  cart: [],
  totalPrice: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const resetCart = createAction('cart/reset');

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

export const updateQuantity = createAsyncThunk(
  'cart/update-cart-quantity',
  async (cartData, thunkAPI) => {
    try {
      return await cartServices.updateQuantity(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/delete-cart',
  async (cartId, thunkAPI) => {
    try {
      return await cartServices.deleteCartItem(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartAfterOrder = createAsyncThunk(
  'cart/delete-cart-after-order',
  async (cartIds, thunkAPI) => {
    try {
      return await cartServices.deleteCartsAfterOrder(cartIds);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
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
        state.totalPrice = state.cart.reduce((prev, curr) => {
          return prev + curr.quantity * curr.price;
        }, 0);
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

        state.cart = [...state.cart, action.payload.data];
        state.totalPrice = state.cart.reduce((prev, curr) => {
          return prev + curr.quantity * curr.price;
        }, 0);

        toast.success('Thêm vào giỏ hàng thành công!');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
      })
      // CẬP NHẬT SỐ LƯỢNG SẢN PHẨM TRONG GIỎ HÀNG
      .addCase(updateQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const updatedCartIndex = state.cart.findIndex(
          (c) => c._id === action.payload.data._id
        );

        state.cart[updatedCartIndex] = action.payload.data;

        state.totalPrice = state.cart.reduce((prev, curr) => {
          return prev + curr.quantity * curr.price;
        }, 0);

        toast.success('Cập nhật giỏ hàng thành công!');
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.data.message);
      })
      // XÓA MỘT CART ITEM
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const deletedCartIndex = state.cart.findIndex(
          (c) => c._id === action.payload.data._id
        );

        state.cart.splice(deletedCartIndex, 1);

        state.totalPrice = state.cart.reduce((prev, curr) => {
          return prev + curr.quantity * curr.price;
        }, 0);

        toast.success('Xóa giỏ hàng thành công!');
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.data.message);
      })
      // XÓA CART ITEMS SAU KHI ĐẶT HÀNG
      .addCase(deleteCartAfterOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartAfterOrder.fulfilled, (state, action) => {
        state.cart = [];
        state.totalPrice = 0;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(deleteCartAfterOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.data.message);
      })
      // RESET STATE
      .addCase(resetCart, () => initialState);
  },
});

export default cartSlice.reducer;
