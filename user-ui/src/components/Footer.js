import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs';

import newsletter from '../images/newsletter.png';

const Footer = () => {
  return (
    <>
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src={newsletter} alt='newsletter' />
                {/* <h2 className='mb-0 text-white'></h2> */}
              </div>
            </div>

            <div className='col-7'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control py-1'
                  placeholder='Địa chỉ email...'
                  aria-label='Địa chỉ email...'
                  aria-describedby='basic-addon2'
                />
                <span className='input-group-text p-2' id='basic-addon2'>
                  ĐĂNG KÝ
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Liên hệ chúng tôi</h4>
              <div>
                <address className='text-white fs-7'>
                  Đường 30/4, phường Hưng Lợi, <br />
                  Quận Ninh Kiều, TP Cần Thơ
                </address>
                <Link
                  className='mt-3 d-block mb-2 text-white'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  094 777 3536
                </Link>
                <Link
                  className='mt-2 d-block mb-2 text-white'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  techzone@gmail.com
                </Link>

                <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                  <Link className='text-white' href='/#'>
                    <BsLinkedin className='fs-4' />
                  </Link>
                  <Link className='text-white' href='/#'>
                    <BsInstagram className='fs-4' />
                  </Link>
                  <Link className='text-white' href='/#'>
                    <BsGithub className='fs-4' />
                  </Link>
                  <Link className='text-white' href='/#'>
                    <BsYoutube className='fs-4' />
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Thông tin</h4>
              <div className='footer-links d-flex flex-column'>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to='/privacy-policy'
                  className='text-white py-2 mb-1'
                >
                  Chính sách riêng tư
                </Link>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to='/refund-policy'
                  className='text-white py-2 mb-1'
                >
                  Chính sách hoàn trả
                </Link>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to='/shipping-policy'
                  className='text-white py-2 mb-1'
                >
                  Chính sách vận chuyển
                </Link>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to='/terms-conditions'
                  className='text-white py-2 mb-1'
                >
                  Các điều khoản và điều kiện
                </Link>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to='/blog'
                  className='text-white py-2 mb-1'
                >
                  Blogs
                </Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Tài khoản</h4>
              <div className='footer-links d-flex flex-column'>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Về chúng tôi
                </Link>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  FAQ
                </Link>
                <Link className='text-white py-2 mb-1'>Liên hệ</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Tham khảo</h4>
              <div className='footer-links d-flex flex-column'>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Laptop
                </Link>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Tai nghe
                </Link>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Tablets
                </Link>
                <Link
                  className='text-white py-2 mb-1'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Đồng hồ thông minh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12 mb-0 text-white'>
              <p className='text-center'>
                &copy; {new Date().getFullYear()}; Coded by Phat{' '}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
