import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { authServices } from './authServices';

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {};

const initialState = {
  user: userFromLocalStorage,
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authServices.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authServices.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addEnquiry = createAsyncThunk(
  'auth/add-enquiry',
  async (enquiryData, thunkAPI) => {
    try {
      return await authServices.addEnquiry(enquiryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ĐĂNG KÝ TÀI KHOẢN
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        toast.success('Đăng ký tài khoản thành công!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Đăng ký tài khoản thất bại!');
      })
      // ĐĂNG NHẬP
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        toast.success('Đăng nhập thành công!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Đăng nhập thất bại!');
      })
      // THÊM LIÊN HỆ/THẮC MẮC
      .addCase(addEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEnquiry.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Đã gửi liên hệ thành công!');
      })
      .addCase(addEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Gửi thắc mắc thất bại!');
      });
  },
});

export default authSlice.reducer;
