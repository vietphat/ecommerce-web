import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src='images/newsletter.png' alt='newsletter' />
                <h2 className='mb-0 text-white'>Đăng ký để xem bản tin</h2>
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
                <a
                  href='tel:0947773536'
                  className='mt-3 d-block mb-2 text-white'
                >
                  094 777 3536
                </a>
                <a
                  href='mailto:vietphatt1909@gmail.com'
                  className='mt-2 d-block mb-2 text-white'
                >
                  vietphatt1909@gmail.com
                </a>

                <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                  <a className='text-white' href=''>
                    <BsLinkedin className='fs-4' />
                  </a>
                  <a className='text-white' href=''>
                    <BsInstagram className='fs-4' />
                  </a>
                  <a className='text-white' href=''>
                    <BsGithub className='fs-4' />
                  </a>
                  <a className='text-white' href=''>
                    <BsYoutube className='fs-4' />
                  </a>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Thông tin</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>
                  Chính sách riêng tư
                </Link>
                <Link className='text-white py-2 mb-1'>Hoàn trả</Link>
                <Link className='text-white py-2 mb-1'>Vận chuyển</Link>
                <Link className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Tài khoản</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Về chúng tôi</Link>
                <Link className='text-white py-2 mb-1'>FAQ</Link>
                <Link className='text-white py-2 mb-1'>Liên hệ</Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Tham khảo</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptop</Link>
                <Link className='text-white py-2 mb-1'>Tai nghe</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Đồng hồ thông minh</Link>
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
