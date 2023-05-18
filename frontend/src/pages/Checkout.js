import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import watch from '../images/watch.jpg';

const Checkout = () => {
  return (
    <>
      <div className='checkout-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-7'>
              <div className='checkout-left-data'>
                <h3 className='website-name'>Dev Cornor</h3>
                <nav
                  style={{ '--bs-breadcrumb-divider': '>' }}
                  aria-label='breadcrumb'
                >
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link className='text-dark total-price' to='/cart'>
                        Giỏ hàng
                      </Link>
                    </li>
                    &nbsp;/
                    <li
                      className='breadcrumb-item active total-price'
                      aria-current='page'
                    >
                      Thông tin
                    </li>
                    &nbsp;/
                    <li className='breadcrumb-item active total-price'>
                      Vận chuyển
                    </li>
                    &nbsp;/
                    <li
                      className='breadcrumb-item active total-price'
                      aria-current='page'
                    >
                      Thanh toán
                    </li>
                  </ol>
                </nav>

                <h4 className='title total'>Thông tin liên hệ</h4>
                <p className='user-details total'>Cabral (cabral@gmail.com)</p>

                <h4 className='mb-3'>Địa chỉ giao hàng</h4>

                <form
                  action=''
                  className='d-flex gap-15 flex-wrap justify-content-between'
                >
                  <div className='w-100'>
                    <select name='' id='' className='form-control form-select'>
                      <option value='' selected disabled>
                        Chọn quốc gia
                      </option>
                    </select>
                  </div>

                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Họ'
                    />
                  </div>

                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Tên'
                    />
                  </div>

                  <div className='w-100'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Địa chỉ'
                    />
                  </div>

                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Thành phố'
                    />
                  </div>

                  <div className='flex-grow-1'>
                    <select name='' id='' className='form-control form-select'>
                      <option value='' selected disabled>
                        Chọn vùng
                      </option>
                    </select>
                  </div>

                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Zipcode'
                    />
                  </div>

                  <div className='w-100'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <Link to='/cart' className='text-dark'>
                        <BiArrowBack className='me-2' />
                        Quay về giỏ hàng
                      </Link>
                      <Link to='/cart' className='button'>
                        Tiếp tục
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='col-5'>
              <div className='border-bottom py-4'>
                <div className='d-flex gap-10 mb-2 align-items-center'>
                  <div className='w-75 d-flex gap-10'>
                    <div className='w-25 position-relative'>
                      <span
                        style={{ top: '-10px', right: '2px' }}
                        className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
                      >
                        1
                      </span>
                      <img className='img-fluid' src={watch} alt='product' />
                    </div>

                    <div>
                      <h5 className='total-price'>asda</h5>
                      <p className='total-price'>s / #dsad</p>
                    </div>
                  </div>

                  <div className='flex-grow-1'>
                    <h5 className='total'>2.500.000đ</h5>
                  </div>
                </div>
              </div>

              <div className='border-bottom py-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='total'>Thành tiền</p>
                  <p className='total-price'>5.000.000đ</p>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-0 total'>Vận chuyển</p>
                  <p className='mb-0 total-price'>25.000đ</p>
                </div>
              </div>

              <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                <h4 className='total'>Tổng</h4>
                <h5 className='total-price'>5.025.000đ</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
