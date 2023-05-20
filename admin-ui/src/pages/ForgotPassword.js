import React from 'react';

import Input from '../components/Input';

const ForgotPassowrd = () => {
  return (
    <div className='py-5' style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <form>
          <h3 className='text-center'>Quên mật khẩu</h3>
          <p className='text-center'>
            Chúng tôi sẽ gửi email tạo mới mật khẩu cho bạn
          </p>
          <Input type='email' label='Email' id='email' />
          <button
            className='border-0 px-3 py-2 text-white fw-bold w-100'
            style={{ background: '#ffd333' }}
            type='submit'
          >
            Tạo lại mật khẩu mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassowrd;
