import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import * as Yup from 'yup';

import Input from '../components/Input';

let loginSchema = Yup.object({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không để được để trống'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    isInitialValid: false,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await dispatch(login(values));

      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/admin');
      }
    },
  });

  const { message } = useSelector((state) => state.auth);

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
        <h3 className='text-center title'>Đăng nhập</h3>
        <p className='text-center'>Đăng nhập vào tài khoản để tiếp tục</p>
        <div className='error text-center'>
          {message.message === 'Rejected' ? 'Bạn không phải là admin' : ''}
        </div>
        <form action='' onSubmit={formik.handleSubmit}>
          <Input
            type='email'
            label='Email'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email}
          </div>

          <Input
            type='password'
            label='Mật khẩu'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          <div className='error'>
            <div>{formik.touched.password && formik.errors.password}</div>
          </div>

          <div className='mb-3 mt-2 text-end'>
            <Link
              className='text-dark'
              to='/forgot-password'
              onClick={() => window.scrollTo(0, 0)}
            >
              Quên mật khẩu?
            </Link>
          </div>
          <button
            disabled={!formik.isValid}
            className={`d-block border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 ${
              formik.isValid ? '' : 'invalid-button'
            }`}
            style={{ background: '#ffd333' }}
            type='submit'
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
