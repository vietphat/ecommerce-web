import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import formatCurrency from '../utils/format_currency';
import { logout } from '../features/auth/authSlice';
import { resetCart } from '../features/cart/cartSlice';
import { resetOrder } from '../features/order/orderSlice';
import { resetWishlist } from '../features/wishlist/wishlistSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState(true);
  const [searchOptions, setSearchOptions] = useState([]);

  const { cart, auth } = useSelector((state) => state);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (products?.length > 0) {
      setSearchOptions((state) => {
        return products.map((product, index) => {
          return {
            id: product._id,
            productId: product._id,
            title: product.title,
          };
        });
      });
    }
  }, [products]);

  const handleLogout = async () => {
    const logoutResult = await dispatch(logout());

    if (logoutResult.meta.requestStatus === 'fulfilled') {
      dispatch(resetWishlist());
      dispatch(resetCart());
      dispatch(resetOrder());
      navigate('/');
    }
  };

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
                <Link to='/' className='text-white'>
                  Ecommerce
                </Link>
              </h2>
            </div>

            <div className='col-5'>
              <div className='input-group'>
                <Typeahead
                  id='pagination-example'
                  onPaginate={() => console.log('Results paginated')}
                  options={searchOptions}
                  onChange={(selected) => {
                    if (selected.length === 0) return;
                    navigate(`/product/${selected[0].productId}`);
                  }}
                  paginate={paginate}
                  labelKey={'title'}
                  placeholder='Nhập tên sản phẩm...'
                />
                <span className='input-group-text p-3' id='basic-addon2'>
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>

            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link
                    className='d-flex align-items-center gap-10 text-white'
                    to='/compare-products'
                  >
                    <img src='/images/compare.svg' alt='compare' />
                    <p className='mb-0'>
                      So sánh
                      <br />
                      sản phẩm
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/wishlist'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/images/wishlist.svg' alt='wishlist' />
                    <p className='mb-0'>
                      Danh sách
                      <br />
                      yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  {!auth.isLoggedIn ? (
                    <Link
                      to='/login'
                      className='d-flex align-items-center gap-10 text-white'
                    >
                      <img src='/images/user.svg' alt='user' />
                      <p className='mb-0'>
                        Đăng <br /> nhập
                      </p>
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className='d-flex align-items-center gap-10 text-white bg-transparent border-0'
                    >
                      {/* <img src='/images/user.svg' alt='user' /> */}
                      <AiOutlineLogout fontSize={40} fontWeight={100} />
                      <p className='mb-0'>
                        Đăng <br /> xuất
                      </p>
                    </button>
                  )}
                </div>
                <div>
                  <Link
                    to='/cart'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/images/cart.svg' alt='cart' />
                    <div className='d-flex flex-column gap-10'>
                      <span className='badge bg-white text-dark'>
                        {cart.cart.length}
                      </span>
                      <p className='mb-0'>{formatCurrency(cart.totalPrice)}</p>
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
                      <img src='/images/menu.svg' alt='menu' />
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
                    <NavLink to='/products'>Sản phẩm</NavLink>
                    <NavLink to='/blog'>Blog</NavLink>
                    <NavLink to='/contact'>Liên hệ</NavLink>
                    {auth?.isLoggedIn ? (
                      <>
                        <NavLink to='/orders'>Đơn hàng</NavLink>
                        <NavLink to='/profile'>Thông tin cá nhân</NavLink>
                      </>
                    ) : (
                      <></>
                    )}
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
