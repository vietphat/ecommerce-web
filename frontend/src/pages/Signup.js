import React from 'react';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const Signup = () => {
  return (
    <>
      <Meta title='Đăng ký tài khoản' />
      <BreadCrumb title='Đăng ký tài khoản' />
      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Đăng ký tài khoản</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='text'
                      name='firstname'
                      placeholder='Họ tên'
                      className='form-control'
                    />
                  </div>

                  <div>
                    <input
                      type='text'
                      name='phonenumber'
                      placeholder='Số điện thoại'
                      className='form-control'
                    />
                  </div>

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
                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                      <button className='button border-0'>Đăng ký ngay</button>
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

export default Signup;
