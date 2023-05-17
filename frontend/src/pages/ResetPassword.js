import React from 'react';
import { Link } from 'react-router-dom';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const ResetPassword = () => {
  return (
    <>
      <Meta title='Tạo lại mật khẩu mới' />
      <BreadCrumb title='Tạo lại mật khẩu mới' />

      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Tạo lại mật khẩu mới</h3>

                {/* <p className='text-center my-2 mb-3'>
                  Chúng tôi sẽ gửi cho bạn một email tạo lại mật khẩu mới
                </p> */}

                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='password'
                      name='password'
                      placeholder='Mật khẩu mới'
                      className='form-control'
                    />
                  </div>

                  <div>
                    <input
                      type='password'
                      name='confirmPassword'
                      placeholder='Xác nhận mật khẩu'
                      className='form-control'
                    />
                  </div>

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
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
