import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import authServices from './authServices';

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: userFromLocalStorage,
  monthlyIncomeReport: [],
  yearlyIncomeReport: [],
  recentlyOrders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const login = createAsyncThunk(
  'auth/admin-login',
  async (user, thunkAPI) => {
    try {
      return await authServices.login(user);
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

export const getMonthlyIncomeReport = createAsyncThunk(
  'report/get-monthly-income',
  async (thunkAPI) => {
    try {
      return await authServices.getMonthlyIncomeReport();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyIncomeReport = createAsyncThunk(
  'report/get-yearly-income',
  async (thunkAPI) => {
    try {
      return await authServices.getYearlyIncomeReport();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRecentlyOrders = createAsyncThunk(
  'report/get-recently-orders',
  async (thunkAPI) => {
    try {
      return await authServices.getRecentlyOrders();
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
      // ĐĂNG NHẬP
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.response.data.message;
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
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // Lấy báo cáo thu nhập hàng tháng
      .addCase(getMonthlyIncomeReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyIncomeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.monthlyIncomeReport = action.payload.data;
      })
      .addCase(getMonthlyIncomeReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      // Lấy báo cáo thu nhập hàng năm
      .addCase(getYearlyIncomeReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyIncomeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.yearlyIncomeReport = action.payload.data;
      })
      .addCase(getYearlyIncomeReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      // Lấy thông tin các hóa đơn mới nhất
      .addCase(getRecentlyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentlyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.recentlyOrders = action.payload.data;
      })
      .addCase(getRecentlyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
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
        toast.error('Cập nhật thông tin thất bại!');
      })
      // QUÊN MẬT KHẨU
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        toast.success('Vui lòng kiểm tra email để lấy lại mật khẩu mới!');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error('Gửi yêu cầu thất bại!');
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
        toast.error(
          'Đường dẫn không chính xác hoặc đã hết thời gian hiệu lực. Vui lòng thử lại!'
        );
      });
  },
});

export default authSlice.reducer;
