import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import customerServices from './customerServices';

const initialState = {
  customers: [],
  currentUser: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getUserById = createAsyncThunk(
  'user/get-a-user',
  async (id, thunkAPI) => {
    try {
      return await customerServices.getUserById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk('user/get-users', async (thunkAPI) => {
  try {
    return await customerServices.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editUserRole = createAsyncThunk(
  'user/edit-user-role',
  async (data, thunkAPI) => {
    try {
      return await customerServices.editUserRole(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAnUser = createAsyncThunk(
  'user/delete-an-user',
  async (id, thunkAPI) => {
    try {
      return await customerServices.deleteUser(id);
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
      // GET AN USER
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET USERS
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
      })
      // EDIT USER ROLE
      .addCase(editUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const newUser = action.payload.data;

        const updatedUserIndex = state.customers.findIndex(
          (u) => u._id === newUser._id
        );

        state.currentUser = newUser;
        state.customers[updatedUserIndex] = newUser;

        toast.success('Sửa quyền người dùng thành công!');
      })
      .addCase(editUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa quyền người dùng thất bại!');
      })
      // DELETE A PRODUCT
      .addCase(deleteAnUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.customers = state.customers.filter(
          (u) => u._id !== action.payload.deletedUserId
        );

        toast.success('Xóa người dùng thành công!');
      })
      .addCase(deleteAnUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa người dùng thất bại!');
      });
  },
});

export default customerSlice.reducer;
