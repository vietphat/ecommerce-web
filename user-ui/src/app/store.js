import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import productSlice from '../features/products/productSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';
import blogSlice from '../features/blogs/blogSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice';
import brandSlice from '../features/brands/brandSlice';
import productCategorySlice from '../features/productCategories/productCategorySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    wishlist: wishlistSlice,
    blog: blogSlice,
    cart: cartSlice,
    order: orderSlice,
    brand: brandSlice,
    productCategory: productCategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
