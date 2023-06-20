import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Blogs from './pages/Blogs';
import BlogCategories from './pages/BlogCategories';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colors from './pages/Colors';
import ProductCategories from './pages/ProductCategories';
import Brands from './pages/Brands';
import Products from './pages/Products';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddBrand from './pages/AddBrand';
import AddProductCategory from './pages/AddProductCategory';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import Coupons from './pages/Coupons';
import EditBrand from './pages/EditBrand';
import EditProductCategory from './pages/EditProductCategory';
import EditColor from './pages/EditColor';
import EditCoupon from './pages/EditCoupon';
import EditBlogCategory from './pages/EditBlogCategory';
import EditBlog from './pages/EditBlog';
import EnquiryDetails from './pages/EnquiryDetails';
import OrderDetails from './pages/OrderDetails';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import EditProduct from './pages/EditProduct';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />

        <Route
          path='/reset-password/:token'
          element={
            <OpenRoutes>
              <ResetPassword />
            </OpenRoutes>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <OpenRoutes>
              <ForgotPassword />
            </OpenRoutes>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />

          {/* CUSTOMERS */}
          <Route path='customers' element={<Customers />} />
          <Route path='user-details/:id' element={<UserDetails />} />

          {/* PRODUCTS */}
          <Route path='add-product' element={<AddProduct />} />
          <Route path='products-list' element={<Products />} />
          <Route path='product-details/:id' element={<ProductDetails />} />
          <Route path='product/:id' element={<EditProduct />} />

          {/* BRANDS */}
          <Route path='add-brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<EditBrand />} />
          <Route path='brands-list' element={<Brands />} />

          {/* PRODUCT-CATEGORIES */}
          <Route path='add-product-category' element={<AddProductCategory />} />
          <Route
            path='product-categories-list'
            element={<ProductCategories />}
          />
          <Route
            path='product-category/:id'
            element={<EditProductCategory />}
          />

          {/* COLORS */}
          <Route path='add-color' element={<AddColor />} />
          <Route path='color/:id' element={<EditColor />} />
          <Route path='colors-list' element={<Colors />} />

          {/* ORDERS */}
          <Route path='orders' element={<Orders />} />
          <Route path='order-details/:id' element={<OrderDetails />} />

          {/* COUPONS */}
          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<EditCoupon />} />
          <Route path='coupons-list' element={<Coupons />} />

          {/* BLOGS */}
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<EditBlog />} />
          <Route path='blogs-list' element={<Blogs />} />
          <Route path='add-blog-category' element={<AddBlogCategory />} />
          <Route path='blog-category/:id' element={<EditBlogCategory />} />
          <Route path='blog-categories-list' element={<BlogCategories />} />

          {/* ENQUIRIES */}
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiry-details/:id' element={<EnquiryDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
