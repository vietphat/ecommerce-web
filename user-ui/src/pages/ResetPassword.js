import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';
import { resetPassword } from '../features/auth/authSlice';
import { getWishlist } from '../features/wishlist/wishlistSlice';
import { getCart } from '../features/cart/cartSlice';
import { getMyOrders } from '../features/order/orderSlice';

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(4, 'Mật khẩu phải có ít nhất 4 kí tự')
    .required('Mật khẩu không được để trống'),
  confirmPassword: Yup.string()
    .required('Mật khẩu xác nhận không được để trống')

    .oneOf(
      [Yup.ref('password'), null],
      'Mật khẩu xác nhận phải giống với mật khẩu'
    ),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token: resetPasswordToken } = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    isInitialValid: false,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values));
      const data = {
        resetPasswordToken,
        passwords: values,
      };
      const resetPasswordResult = await dispatch(resetPassword(data));

      if (resetPasswordResult.meta.requestStatus === 'fulfilled') {
        dispatch(getWishlist());
        dispatch(getCart());
        dispatch(getMyOrders());
        navigate('/');
      }
    },
  });

  return (
    <>
      <Meta title='Techzone | Tạo lại mật khẩu mới' />
      <BreadCrumb title='Tạo lại mật khẩu mới' />

      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Tạo lại mật khẩu mới</h3>

              <form
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column gap-15'
              >
                <Input
                  type='password'
                  name='password'
                  placeholder='Mật khẩu'
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <div className='error'>
                  {formik.touched.password && formik.errors.password}
                </div>

                <Input
                  type='password'
                  name='confirmPassword'
                  placeholder='Xác nhận mật khẩu'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange('confirmPassword')}
                  onBlur={formik.handleBlur('confirmPassword')}
                />
                <div className='error'>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </div>

                <div>
                  <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                    <button
                      disabled={!formik.isValid}
                      className={`button border-0 ${
                        formik.isValid ? '' : 'invalid-button'
                      }`}
                      type='submit'
                    >
                      Gửi
                    </button>
                    <Link
                      to='/login'
                      className='text-decoration-underline'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Hủy bỏ
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

export default ResetPassword;
