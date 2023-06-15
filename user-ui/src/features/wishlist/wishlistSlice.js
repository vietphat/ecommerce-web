import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { wishlistServices } from './wishlistServices';

const initialState = {
  wishlist: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async (productId, thunkAPI) => {
    try {
      return await wishlistServices.addToWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'wishlist/get',
  async (thunkAPI) => {
    try {
      return await wishlistServices.getWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // THÊM SẢN PHẨM VÀO DANH SÁCH YÊU THÍCH
      .addCase(addToWishlist.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload.data.wishlist;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // LẤY DANH SÁCH YÊU THÍCH
      .addCase(getWishlist.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload.data;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default wishlistSlice.reducer;
