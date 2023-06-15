import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import productSlice from '../features/products/productSlice';
import wishlistSlice from '../features/wishlist/wishlistSlice';
import blogSlice from '../features/blogs/blogSlice';
import cartSlice from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    wishlist: wishlistSlice,
    blog: blogSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
