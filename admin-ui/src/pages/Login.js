import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../components/Input';

const Login = () => {
  return (
    <div className='py-5' style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <form>
          <h3 className='text-center'>Đăng nhập</h3>
          <p className='text-center'>Đăng nhập vào tài khoản để tiếp tục</p>
          <Input type='email' label='Email' id='email' />
          <Input type='password' label='Mật khẩu' id='password' />
          <div className='mb-3 text-end'>
            <Link to='/forgot-password'>Quên mật khẩu?</Link>
          </div>
          <Link
            to='/admin'
            className='d-block border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
            style={{ background: '#ffd333' }}
          >
            Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
