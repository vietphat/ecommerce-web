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

export const getABlogCategory = createAsyncThunk(
  'blog-category/get-a-blog-category',
  async (id, thunkAPI) => {
    try {
      return await blogCategoryServices.getABlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const editABlogCategory = createAsyncThunk(
  'blog-category/edit-a-blog-category',
  async (blogCategoryData, thunkAPI) => {
    try {
      return await blogCategoryServices.editABlogCategory(blogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCategory = createAsyncThunk(
  'blog-category/delete-a-blog-category',
  async (id, thunkAPI) => {
    try {
      return await blogCategoryServices.deleteABlogCategory(id);
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
      // GET A BLOG CATEGORY
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentBlogCategory = action.payload.data;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
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
      // EDIT A BLOG CATEGORY
      .addCase(editABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Sửa danh mục bài viết thành công!');
      })
      .addCase(editABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa danh mục bài viết thất bại!');
      })
      // DELETE A BLOG CATEGORY
      .addCase(deleteABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = state.blogCategories.filter(
          (bc) => bc._id !== action.payload.deletedBlogCategoryId
        );
        toast.success('Xóa danh mục bài viết thành công!');
      })
      .addCase(deleteABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa danh mục bài viết thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
