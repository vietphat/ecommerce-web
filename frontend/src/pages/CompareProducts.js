import React from 'react';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import Container from '../components/Container';

const CompareProducts = () => {
  return (
    <>
      <Meta title='So sánh sản phẩm' />
      <BreadCrumb title='So sánh sản phẩm' />
      <Container class1='compare-products-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-3'>
            <div className='compare-product-card position-relative'>
              <img
                src='/images/cross.svg'
                alt='cross'
                className='position-absolute cross img-fluid'
              />

              <div className='product-card-image'>
                <img src='/images/watch.jpg' alt='watch' />
              </div>

              <div className='compare-product-details'>
                <h5 className='title'>
                  Laptop Lenovo Yoga 7 14IAL7 i5
                  1240P/16GB/512GB/Touch/Pen/Win11 (82QE000RVN)
                </h5>
                <h6 className='price mb-3 mt-3'>25.000.000đ</h6>

                <div>
                  <div className='product-detail'>
                    <h5>Thương hiệu:</h5>
                    <p>Lenovo</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Loại:</h5>
                    <p>Laptop</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Tình trạng:</h5>
                    <p>Còn hàng</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Màu sắc:</h5>
                    <Color />
                  </div>

                  <div className='product-detail'>
                    <h5>Kích thước:</h5>
                    <div className='d-flex gap-10'>
                      <p>S</p>
                      <p>M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='compare-product-card position-relative'>
              <img
                src='/images/cross.svg'
                alt='cross'
                className='position-absolute cross img-fluid'
              />

              <div className='product-card-image'>
                <img src='/images/watch.jpg' alt='watch' />
              </div>

              <div className='compare-product-details'>
                <h5 className='title'>
                  Laptop Lenovo Yoga 7 14IAL7 i5
                  1240P/16GB/512GB/Touch/Pen/Win11 (82QE000RVN)
                </h5>
                <h6 className='price mb-3 mt-3'>25.000.000đ</h6>

                <div>
                  <div className='product-detail'>
                    <h5>Thương hiệu:</h5>
                    <p>Lenovo</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Loại:</h5>
                    <p>Laptop</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Tình trạng:</h5>
                    <p>Còn hàng</p>
                  </div>

                  <div className='product-detail'>
                    <h5>Màu sắc:</h5>
                    <Color />
                  </div>

                  <div className='product-detail'>
                    <h5>Kích thước:</h5>
                    <div className='d-flex gap-10'>
                      <p>S</p>
                      <p>M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProducts;
