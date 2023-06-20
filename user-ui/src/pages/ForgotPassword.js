import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';
import { forgotPassword } from '../features/auth/authSlice';

const forgotPasswordSchema = Yup.object({
  email: Yup.string().required('Email không được để trống'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    isInitialValid: false,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      dispatch(forgotPassword(values.email));
    },
  });

  return (
    <>
      <Meta title='Techzone | Quên mật khẩu' />
      <BreadCrumb title='Quên mật khẩu' />

      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Quên mật khẩu</h3>

              <p className='text-center my-2 mb-3'>
                Chúng tôi sẽ gửi cho bạn một email tạo lại mật khẩu mới
              </p>

              <form
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column gap-15'
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

                <div>
                  <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                    <button
                      disabled={!formik.isValid}
                      className='button border-0'
                      type='submit'
                    >
                      Gửi
                    </button>
                    <Link to='/login'>Hủy bỏ</Link>
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

export default ForgotPassword;
