import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Header = () => {
  return (
    <>
      {/* HEADER-TOP */}
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>
                Giao hàng miễn phí cho các đơn hàng trên 1.000.000 đồng
              </p>
            </div>
            <div className='col-6 '>
              <p className='text-end text-white mb-0'>Liên hệ: 094 777 3536</p>
            </div>
          </div>
        </div>
      </header>
      {/* HEADER-UPPER */}
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link className='text-white'>Developers</Link>
              </h2>
            </div>

            <div className='col-5'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control py-2'
                  placeholder='Tìm kiếm sản phẩm...'
                  aria-label='Tìm kiếm sản phẩm...'
                  aria-describedby='basic-addon2'
                />
                <span className='input-group-text p-3' id='basic-addon2'>
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>

            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src='/images/compare.svg' alt='compare' />
                    <p className='mb-0'>
                      So sánh
                      <br />
                      sản phẩm
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src='/images/wishlist.svg' alt='wishlist' />
                    <p className='mb-0'>
                      Danh sách
                      <br />
                      yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src='/images/user.svg' alt='user' />
                    <p className='mb-0'>
                      Đăng <br /> nhập
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'>
                    <img src='/images/cart.svg' alt='cart' />
                    <div className='d-flex flex-column gap-10'>
                      <span className='badge bg-white text-dark'>0</span>
                      <p className='mb-0'>0đ</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* HEADER-BOTTOM  */}
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-15'>
                <div>
                  <div className='dropdown'>
                    <button
                      className='btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img src='images/menu.svg' alt='menu' />
                      <span className='me-5 d-inline-block'>
                        Danh mục sản phẩm
                      </span>
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'
                    >
                      <li>
                        <Link className='dropdown-item text-white' to=''>
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item text-white' to=''>
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item text-white' to=''>
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to='/'>Trang chủ</NavLink>
                    <NavLink to='/'>Cửa hàng</NavLink>
                    <NavLink to='/'>Blog</NavLink>
                    <NavLink to='/'>Liên hệ</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
