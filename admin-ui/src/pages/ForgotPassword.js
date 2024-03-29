import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { forgotPassword } from '../features/auth/authSlice';
import Input from '../components/Input';

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
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
      formik.resetForm();
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
        <h3 className='text-center title'>Quên mật khẩu</h3>
        <p className='text-center'>
          Chúng tôi sẽ gửi email tạo mới mật khẩu cho bạn
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className='d-flex flex-column gap-15'
        >
          <Input
            type='email'
            name='email'
            label='Email'
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
                className={`border-0 px-3 py-2 text-white fw-bold w-100 mt-3 ${
                  formik.isValid ? '' : 'invalid-button'
                }`}
                type='submit'
                style={{
                  background:
                    'radial-gradient(circle at center, #ff6b6b, #0a81ab)',
                }}
              >
                Gửi
              </button>
              <Link
                className='mt-3 text-dark'
                to='/'
                onClick={() => window.scrollTo(0, 0)}
              >
                Hủy bỏ
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
