import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import customerServices from './customerServices';

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getUsers = createAsyncThunk(
  'customer/get-customers',
  async (jwt, thunkAPI) => {
    try {
      return await customerServices.getUsers(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload.data.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default customerSlice.reducer;
