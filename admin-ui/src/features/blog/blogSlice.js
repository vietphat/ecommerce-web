import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import blogServices from './blogServices';

const initialState = {
  blogs: [],
  currentBlog: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getABlog = createAsyncThunk(
  'blog/get-a-blog',
  async (id, thunkAPI) => {
    try {
      return await blogServices.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
  try {
    return await blogServices.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBlog = createAsyncThunk(
  'blog/create-blog',
  async (blog, thunkAPI) => {
    try {
      return await blogServices.createBlog(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editABlog = createAsyncThunk(
  'blog/edit-a-blog',
  async (blogData, thunkAPI) => {
    try {
      return await blogServices.editABlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlog = createAsyncThunk(
  'blog/delete-a-blog',
  async (id, thunkAPI) => {
    try {
      return await blogServices.deleteABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BLOGS
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload.data;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET A BLOG
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentBlog = action.payload.data;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE BLOG
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = [...state.blogs, action.payload.data];
        toast.success('Thêm bài viết thành công!');
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.success('Thêm bài viết thất bại!');
      })
      // EDIT A BLOG
      .addCase(editABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const newBlog = action.payload.data;

        const updatedBlogIndex = state.blogs.findIndex(
          (b) => b._id === newBlog._id
        );

        state.currentBlog = newBlog;
        state.products[updatedBlogIndex] = newBlog;

        toast.success('Sửa bài viết thành công!');
      })
      .addCase(editABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa bài viết thất bại!');
      })
      // DELETE A BLOG
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter(
          (b) => b._id !== action.payload.deletedBlogId
        );
        toast.success('Xóa bài viết thành công!');
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa bài viết thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
