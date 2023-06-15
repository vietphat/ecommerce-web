import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { register } from '../features/auth/authSlice';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';

const signUpSchema = Yup.object({
  firstName: Yup.string().required('Tên không được để trống'),
  lastName: Yup.string().required('Họ không được để trống'),
  phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  confirmPassword: Yup.string()
    .required('Mật khẩu xác nhận không được để trống')
    .oneOf(
      [Yup.ref('password'), null],
      'Mật khẩu xác nhận phải giống với mật khẩu'
    ),
});

const Signup = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatch(register(values));
      // navigate('/');
    },
  });

  return (
    <>
      <Meta title='Đăng ký tài khoản' />
      <BreadCrumb title='Đăng ký tài khoản' />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đăng ký tài khoản</h3>
              <form
                action=''
                className='d-flex flex-column gap-15'
                onSubmit={formik.handleSubmit}
              >
                <Input
                  type='text'
                  name='lastName'
                  placeholder='Họ'
                  value={formik.values.lastName}
                  onChange={formik.handleChange('lastName')}
                  onBlur={formik.handleBlur('lastName')}
                />
                <div className='error'>
                  {formik.touched.lastName && formik.errors.lastName}
                </div>

                <Input
                  type='text'
                  name='firstName'
                  placeholder='Tên'
                  value={formik.values.firstName}
                  onChange={formik.handleChange('firstName')}
                  onBlur={formik.handleBlur('firstName')}
                />
                <div className='error'>
                  {formik.touched.firstName && formik.errors.firstName}
                </div>

                <Input
                  type='text'
                  name='phoneNumber'
                  placeholder='Số điện thoại'
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange('phoneNumber')}
                  onBlur={formik.handleBlur('phoneNumber')}
                />
                <div className='error'>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </div>

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
                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button type='submit' className='button border-0'>
                      Đăng ký ngay
                    </button>
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

export default Signup;
