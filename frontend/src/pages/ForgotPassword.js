import React from 'react';
import { Link } from 'react-router-dom';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';

const ForgotPassword = () => {
  return (
    <>
      <Meta title='Quên mật khẩu' />
      <BreadCrumb title='Quên mật khẩu' />

      <Container class1='login-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-3'>Quên mật khẩu</h3>

              <p className='text-center my-2 mb-3'>
                Chúng tôi sẽ gửi cho bạn một email tạo lại mật khẩu mới
              </p>

              <form action='' className='d-flex flex-column gap-15'>
                <Input type='email' name='email' placeholder='Email' />

                <div>
                  <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                    <button className='button border-0' type='submit'>
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
