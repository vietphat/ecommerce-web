import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authServices from './authServices';

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: userFromLocalStorage,
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
