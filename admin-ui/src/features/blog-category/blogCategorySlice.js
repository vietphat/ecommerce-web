import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import blogCategoryServices from './blogCategoryServices';

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getBlogCategories = createAsyncThunk(
  'blog-category/get-blog-categories',
  async (thunkAPI) => {
    try {
      return await blogCategoryServices.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  'blog-category/create-blog-category',
  async (blogCategory, thunkAPI) => {
    try {
      return await blogCategoryServices.createBlogCategory(blogCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogCategorySlice = createSlice({
  name: 'blogCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BLOG CATEGORIES
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload.data;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE BLOG CATEGORY
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = [...state.blogCategories, action.payload.data];
        toast.success('Thêm danh mục bài viết thành công!');
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm danh mục bài viết thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
