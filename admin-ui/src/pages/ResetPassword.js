import React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { resetPassword } from '../features/auth/authSlice';

const resetPasswordSchema = Yup.object({
  password: Yup.string().required('Mật khẩu không được để trống'),
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
      const data = {
        resetPasswordToken,
        passwords: values,
      };

      const resetPasswordResult = await dispatch(resetPassword(data));

      if (resetPasswordResult.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    },
  });

  return (
    <div
      className='py-5'
      style={{
        background: 'radial-gradient(circle at center, #ff6b6b, #0a81ab)',
        minHeight: '100vh',
      }}
    >
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <form onSubmit={formik.handleSubmit}>
          <h3 className='text-center title'>Tạo lại mật khẩu</h3>
          <p className='text-center'>Tạo lại mật khẩu mới</p>
          <Input
            type='password'
            name='password'
            placeholder='Mật khẩu'
            label='Mật khẩu'
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
            label='Xác nhận mật khẩu'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
          />

          <div className='error'>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </div>

          <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
            <button
              disabled={!formik.isValid}
              className={`border-0 px-3 py-2 text-white fw-bold w-100 mt-3 ${
                formik.isValid ? '' : 'invalid-button'
              }`}
              style={{
                background:
                  'radial-gradient(circle at center, #ff6b6b, #0a81ab)',
              }}
              type='submit'
            >
              Xác nhận
            </button>

            <Link
              className='mt-3 text-dark'
              to='/'
              onClick={() => window.scrollTo(0, 0)}
            >
              Hủy bỏ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
