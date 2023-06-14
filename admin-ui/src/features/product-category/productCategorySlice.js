import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import productCategoryServices from './productCategoryServices';

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getProductCategories = createAsyncThunk(
  'product-category/get-product-categories',
  async (thunkAPI) => {
    try {
      return await productCategoryServices.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProductCategory = createAsyncThunk(
  'product-category/get-a-product-category',
  async (id, thunkAPI) => {
    try {
      return await productCategoryServices.getAProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  'product-category/create-product-category',
  async (productCategory, thunkAPI) => {
    try {
      return await productCategoryServices.createProductCategory(
        productCategory
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editAProductCategory = createAsyncThunk(
  'product-category/edit-a-product-category',
  async (productCategoryData, thunkAPI) => {
    try {
      return await productCategoryServices.editAProductCategory(
        productCategoryData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProductCategory = createAsyncThunk(
  'product-category/delete-a-product-category',
  async (id, thunkAPI) => {
    try {
      return await productCategoryServices.deleteAProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET PRODUCT CATEGORIES
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload.data;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET A PRODUCT CATEGORY
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentProductCategory = action.payload.data;
      })
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE PRODUCT CATEGORIES
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = [
          ...state.productCategories,
          action.payload.data,
        ];
        toast.success('Thêm loại sản phẩm thành công!');
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm loại sản phẩm thất bại!');
      })
      // EDIT A PRODUCT CATEGORY
      .addCase(editAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Sửa loại sản phẩm thành công!');
      })
      .addCase(editAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa loại sản phẩm thất bại!');
      })
      // DELETE A PRODUCT CATEGORY
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = state.productCategories.filter(
          (pc) => pc._id !== action.payload.deletedProductCategoryId
        );
        toast.success('Xóa loại sản phẩm thành công!');
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa loại sản phẩm thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
