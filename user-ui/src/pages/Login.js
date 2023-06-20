import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { login } from '../features/auth/authSlice';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';
import { getCart } from '../features/cart/cartSlice';
import { getMyOrders } from '../features/order/orderSlice';
import { getWishlist } from '../features/wishlist/wishlistSlice';

const loginSchema = Yup.object({
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values));
      const loginResult = await dispatch(login(values));

      if (loginResult.meta.requestStatus === 'fulfilled') {
        dispatch(getWishlist());
        dispatch(getCart());
        dispatch(getMyOrders());
        navigate('/');
      }
    },
  });

  return (
    <>
      <Meta title='Techzone | Đăng nhập' />
      <BreadCrumb title='Đăng nhập' />

      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đăng nhập</h3>
              <form
                action=''
                className='d-flex flex-column gap-15'
                onSubmit={formik.handleSubmit}
              >
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                <div className='error'>
                  {formik.touched.email && formik.errors.email}
                </div>

                <Input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <div className='error'>
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  <Link
                    to='/forgot-password'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Quên mật khẩu?
                  </Link>

                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0' type='submit'>
                      Đăng nhập
                    </button>
                    <Link
                      to='/signup'
                      className='button signup'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
