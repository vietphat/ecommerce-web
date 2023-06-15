import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { blogServices } from './blogServices';

const initialState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getBlogs = createAsyncThunk('blog/get-all', async (thunkAPI) => {
  try {
    return await blogServices.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getABlog = createAsyncThunk(
  'blog/get',
  async (blogId, thunkAPI) => {
    try {
      return await blogServices.getABlog(blogId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const wishlistSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LẤY DANH SÁCH BÀI VIẾT
      .addCase(getBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload.data;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      // LẤY MỘT BÀI VIẾT
      .addCase(getABlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.currentBlog = action.payload.data;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default wishlistSlice.reducer;
