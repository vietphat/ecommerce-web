import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <>
      {/* BANNER */}
      <section className='home-wrapper-1 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div className='main-banner position-relative'>
                <img
                  src='images/main-banner-1.jpg'
                  alt='main banner'
                  className='img-fluid rounded-3'
                />

                <div className='main-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link className='button'>MUA NGAY</Link>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='d-flex gap-10 flex-wrap justify-content-between align-items-center'>
                <div className='small-banner position-relative'>
                  <img
                    src='images/catbanner-01.jpg'
                    alt='small banner'
                    className='img-fluid rounded-3'
                  />

                  <div className='small-banner-content position-absolute'>
                    <h4>BEST SALES</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>

                <div className='small-banner position-relative'>
                  <img
                    src='images/catbanner-02.jpg'
                    alt='small banner'
                    className='img-fluid rounded-3'
                  />

                  <div className='small-banner-content position-absolute'>
                    <h4>NEW ARRIAL</h4>
                    <h5>Buy IPad Air</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>

                <div className='small-banner position-relative'>
                  <img
                    src='images/catbanner-03.jpg'
                    alt='small banner'
                    className='img-fluid rounded-3'
                  />

                  <div className='small-banner-content position-absolute'>
                    <h4>SUPERCHARGED FOR PROS.</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>

                <div className='small-banner position-relative'>
                  <img
                    src='images/catbanner-04.jpg'
                    alt='small banner'
                    className='img-fluid rounded-3'
                  />

                  <div className='small-banner-content position-absolute'>
                    <h4>SUPERCHARGED FOR PROS.</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center gap-15'>
                  <img src='images/service.png' alt='services' />
                  <div>
                    <h6>Giao hàng miễn phí</h6>
                    <p className='mb-0'>Cho các đơn hàng trên 1 triệu đồng</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src='images/service-02.png' alt='services' />
                  <div>
                    <h6>Các sự kiện giảm giá</h6>
                    <p className='mb-0'>Giảm đến 25%</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src='images/service-03.png' alt='services' />
                  <div>
                    <h6>Hỗ trợ 24/7</h6>
                    <p className='mb-0'>Mua sắm với chuyên gia</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src='images/service-04.png' alt='services' />
                  <div>
                    <h6>Giá cả phải chăng</h6>
                    <p className='mb-0'>Giá rẻ đúng giá trị thực</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src='images/service-05.png' alt='services' />
                  <div>
                    <h6>Thanh toán online</h6>
                    <p className='mb-0'>100% an toàn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='categories d-flex flex-wrap justify-content-between align-items-center'>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/camera.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/camera.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/tv.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Headphone</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/headphone.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/camera.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/camera.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/tv.jpg' alt='camera' />
                </div>

                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Headphone</h6>
                    <p>10 items</p>
                  </div>
                  <img src='images/headphone.jpg' alt='camera' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className='featured-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Các sản phẩm nổi bật</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className='marquee-wrapper py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='marquee-inner-wrapper bg-white p-3'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-01.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-02.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-03.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-04.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-05.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-06.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='/images/brand-07.png' alt='brand' />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUT LASTEST NEWS */}
      <section className='blog-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Bản tin</h3>
            </div>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
