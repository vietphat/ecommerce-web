import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import productServices from './productServices';

const initialState = {
  products: [],
  currentProduct: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getProductById = createAsyncThunk(
  'product/get-a-product',
  async (id, thunkAPI) => {
    try {
      return await productServices.getProductById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/get-products',
  async (thunkAPI) => {
    try {
      return await productServices.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create-product',
  async (product, thunkAPI) => {
    try {
      return await productServices.createProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editAProduct = createAsyncThunk(
  'product/edit-a-product',
  async (blogData, thunkAPI) => {
    try {
      return await productServices.editAProduct(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  'product/delete-a-product',
  async (id, thunkAPI) => {
    try {
      return await productServices.deleteAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET A PRODUCT
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentProduct = action.payload.data;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = [...state.products, action.payload.data];
        toast.success('Thêm sản phẩm thành công!');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm sản phẩm thất bại!');
      })
      // EDIT A PRODUCT
      .addCase(editAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        const newProduct = action.payload.data;

        const updatedProductIndex = state.products.findIndex(
          (p) => p._id === newProduct._id
        );

        state.currentProduct = newProduct;
        state.products[updatedProductIndex] = newProduct;

        toast.success('Sửa sản phẩm thành công!');
      })
      .addCase(editAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa sản phẩm thất bại!');
      })
      // DELETE A PRODUCT
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.products = state.products.filter(
          (p) => p._id !== action.payload.deletedProductId
        );

        toast.success('Xóa sản phẩm thành công!');
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa sản phẩm thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
