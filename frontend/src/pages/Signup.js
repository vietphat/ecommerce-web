import React from 'react';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';

const Signup = () => {
  return (
    <>
      <Meta title='Đăng ký tài khoản' />
      <BreadCrumb title='Đăng ký tài khoản' />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Đăng ký tài khoản</h3>
              <form action='' className='d-flex flex-column gap-15'>
                <Input type='text' name='name' placeholder='Họ tên' />

                <Input
                  type='text'
                  name='phoneNumber'
                  placeholder='Số điện thoại'
                />

                <Input type='email' name='email' placeholder='Email' />

                <Input type='password' name='password' placeholder='Mật khẩu' />

                <div>
                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0'>Đăng ký ngay</button>
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
