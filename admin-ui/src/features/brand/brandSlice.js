import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import brandServices from './brandServices';

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');

export const getBrands = createAsyncThunk(
  'brand/get-brands',
  async (thunkAPI) => {
    try {
      return await brandServices.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABrand = createAsyncThunk(
  'brand/get-a-brand',
  async (id, thunkAPI) => {
    try {
      return await brandServices.getABrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  'brand/create-brand',
  async (brand, thunkAPI) => {
    try {
      return await brandServices.createBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editABrand = createAsyncThunk(
  'brand/edit-a-brand',
  async (brandData, thunkAPI) => {
    try {
      return await brandServices.editABrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABrand = createAsyncThunk(
  'brand/delete-a-brand',
  async (id, thunkAPI) => {
    try {
      return await brandServices.deleteABrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BRANDS
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload.data;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // GET A BRAND
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentBrand = action.payload.data;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // CREATE BRAND
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = [...state.brands, action.payload.data];
        toast.success('Thêm thương hiệu thành công!');
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Thêm thương hiệu thất bại!');
      })
      // EDIT A BRAND
      .addCase(editABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.success('Sửa thương hiệu thành công!');
      })
      .addCase(editABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Sửa thương hiệu thất bại!');
      })
      // DELETE A BRAND
      .addCase(deleteABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (b) => b._id !== action.payload.deletedBrandId
        );
        toast.success('Xóa thương hiệu thành công!');
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error('Xóa thương hiệu thất bại!');
      })
      // RESET STATE
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
