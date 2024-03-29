import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { authServices } from './authServices';

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: userFromLocalStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLoggedIn: !!userFromLocalStorage,
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

export const logout = createAsyncThunk('auth/lgout', async (thunkAPI) => {
  try {
    return await authServices.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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

export const updateMyData = createAsyncThunk(
  'auth/update-my-data',
  async (userData, thunkAPI) => {
    try {
      return await authServices.updateMyData(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email, thunkAPI) => {
    try {
      return await authServices.forgotPassword(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (data, thunkAPI) => {
    try {
      return await authServices.resetPassword(data);
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
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        toast.success('Đăng ký tài khoản thành công!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      })
      // ĐĂNG NHẬP
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        toast.success('Đăng nhập thành công!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      })
      // ĐĂNG XUẤT
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
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
        toast.error(action.payload.response.data.message);
      })
      // CẬP NHẬT THÔNG TIN CÁ NHÂN
      .addCase(updateMyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        const newUser = {
          ...state.user,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          phoneNumber: action.payload.data.phoneNumber,
        };

        state.user = newUser;

        localStorage.setItem('user', JSON.stringify(newUser));

        toast.success('Cập nhật thông tin thành công!');
      })
      .addCase(updateMyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      })
      // QUÊN MẬT KHẨU
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        toast.success('Vui lòng kiểm tra email để lấy lại mật khẩu mới!');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      })
      // CÀI LẠI MẬT KHẨU
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.user = action.payload;
        toast.success('Tạo lại mật khẩu thành công!');
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      });
  },
});

export default authSlice.reducer;
