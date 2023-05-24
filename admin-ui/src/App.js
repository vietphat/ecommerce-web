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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path='enquiries' element={<Enquiries />} />

          <Route path='add-blog' element={<AddBlog />} />
          <Route path='blogs-list' element={<Blogs />} />
          <Route path='add-blog-category' element={<AddBlogCategory />} />
          <Route path='blog-categories-list' element={<BlogCategories />} />

          <Route path='orders' element={<Orders />} />

          <Route path='customers' element={<Customers />} />

          <Route path='add-color' element={<AddColor />} />
          <Route path='colors-list' element={<Colors />} />

          <Route path='add-product-category' element={<AddProductCategory />} />
          <Route
            path='product-categories-list'
            element={<ProductCategories />}
          />

          <Route path='add-brand' element={<AddBrand />} />
          <Route path='brands-list' element={<Brands />} />

          <Route path='add-product' element={<AddProduct />} />
          <Route path='products-list' element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
