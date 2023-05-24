import React from 'react';

import Input from '../components/Input';

const ResetPassword = () => {
  return (
    <div className='py-5' style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <form>
          <h3 className='text-center title'>Tạo lại mật khẩu</h3>
          <p className='text-center'>Tạo lại mật khẩu mới</p>
          <Input type='password' label='Mật khẩu mới' id='newPassword' />
          <Input
            type='password'
            label='Xác nhận mật khẩu'
            id='confirmPassword'
          />
          <button
            className='border-0 px-3 py-2 text-white fw-bold w-100'
            style={{ background: '#ffd333' }}
            type='submit'
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
