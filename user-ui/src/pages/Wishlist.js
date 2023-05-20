import React from 'react';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const Wishlist = () => {
  return (
    <>
      <Meta title='Danh sách yêu thích' />
      <BreadCrumb title='Danh sách yêu thích' />
      <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            <div className='wishlist-card position-relative'>
              <img
                src='/images/cross.svg'
                alt='cross'
                className='position-absolute cross img-fluid'
              />
              <div className='wishlist-card-image'>
                <img
                  className='img-fluid w-100'
                  src='/images/watch.jpg'
                  alt='watch'
                />
              </div>

              <div className='py-3 px-3'>
                <h5 className='title'>
                  Laptop Lenovo Yoga 7 14IAL7 (82QE000RVN)
                </h5>
                <h6 className='price'>25.000.000đ</h6>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='wishlist-card position-relative'>
              <img
                src='/images/cross.svg'
                alt='cross'
                className='position-absolute cross img-fluid'
              />
              <div className='wishlist-card-image'>
                <img
                  className='img-fluid w-100'
                  src='/images/watch.jpg'
                  alt='watch'
                />
              </div>

              <div className='py-3 px-3'>
                <h5 className='title'>
                  Laptop Lenovo Yoga 7 14IAL7 (82QE000RVN)
                </h5>
                <h6 className='price'>25.000.000đ</h6>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='wishlist-card position-relative'>
              <img
                src='/images/cross.svg'
                alt='cross'
                className='position-absolute cross img-fluid'
              />
              <div className='wishlist-card-image'>
                <img
                  className='img-fluid w-100'
                  src='/images/watch.jpg'
                  alt='watch'
                />
              </div>

              <div className='py-3 px-3'>
                <h5 className='title'>
                  Laptop Lenovo Yoga 7 14IAL7 (82QE000RVN)
                </h5>
                <h6 className='price'>25.000.000đ</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
