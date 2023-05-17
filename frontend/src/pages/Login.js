import React from 'react';
import { Link } from 'react-router-dom';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const Login = () => {
  return (
    <>
      <Meta title='Đăng nhập' />
      <BreadCrumb title='Đăng nhập' />

      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Đăng nhập</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      className='form-control'
                    />
                  </div>

                  <div className='mt-1'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Mật khẩu'
                      className='form-control'
                    />
                  </div>

                  <div>
                    <Link to='/forgot-password'>Quên mật khẩu?</Link>

                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                      <button className='button border-0' type='submit'>
                        Đăng nhập
                      </button>
                      <Link to='/signup' className='button signup'>
                        Đăng ký
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
