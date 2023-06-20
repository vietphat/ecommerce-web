import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';

import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { getBlogs } from '../features/blogs/blogSlice';
import { getAllProducts } from '../features/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getAllProducts());
  }, [dispatch]);

  const { blogs } = useSelector((state) => state.blog);
  const { products } = useSelector((state) => state.product);

  return (
    <>
      <Meta title='Techzone | Trang chủ' />
      {/* BANNER */}
      <Container class1='home-wrapper-1 py-5'>
        <div className='row'>
          <div className='col-6'>
            <div className='main-banner position-relative'>
              <img
                src='/images/main-banner-1.jpg'
                alt='main banner'
                className='img-fluid rounded-3'
              />

              {/* <div className='main-banner-content position-absolute'>
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className='button'>MUA NGAY</Link>
              </div> */}
            </div>
          </div>

          <div className='col-6'>
            <div className='d-flex gap-10 flex-wrap justify-content-between align-items-center h-100'>
              <div className='small-banner position-relative'>
                <img
                  src='/images/catbanner-01.jpg'
                  alt='small banner'
                  className='img-fluid rounded-3'
                />

                {/* <div className='small-banner-content position-absolute'>
                  <h4>BEST SALES</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>

              <div className='small-banner position-relative'>
                <img
                  src='/images/catbanner-02.jpg'
                  alt='small banner'
                  className='img-fluid rounded-3'
                />

                {/* <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIAL</h4>
                  <h5>Buy IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>

              <div className='small-banner position-relative'>
                <img
                  src='/images/catbanner-03.jpg'
                  alt='small banner'
                  className='img-fluid rounded-3'
                />

                {/* <div className='small-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>

              <div className='small-banner position-relative'>
                <img
                  src='/images/catbanner-04.jpg'
                  alt='small banner'
                  className='img-fluid rounded-3'
                />

                {/* <div className='small-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* SERVICES */}
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='services d-flex align-items-center justify-content-between'>
              {services?.map((service, i) => (
                <div className='d-flex align-items-center gap-15' key={i}>
                  <img src={service.image} alt='services' />
                  <div>
                    <h6>{service.title}</h6>
                    <p className='mb-0'>{service.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* CATEGORIES */}
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='categories d-flex flex-wrap justify-content-between align-items-center'>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Điện thoại di động</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/mobile.jpg'
                  alt='mobile'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Máy tính xách tay</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/laptop.jpg'
                  alt='laptop'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Máy tính để bàn</h6>
                  <p>10 items</p>
                </div>
                <img width={110} height={110} src='/images/pc.jpg' alt='pc' />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Máy tính bảng</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/tablet.jpg'
                  alt='tablet'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Thiết bị âm thanh</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/sound.jpg'
                  alt='sound'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Thiết bị gia đình thông minh</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/camera.jpg'
                  alt='camera'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Thiết bị ngoại vi</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/screen.jpg'
                  alt='screen'
                />
              </div>

              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Phụ kiện điện tử</h6>
                  <p>10 items</p>
                </div>
                <img
                  width={110}
                  height={110}
                  src='/images/keyboard.jpg'
                  alt='keyboard'
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* FEATURED PRODUCTS */}
      <Container class1='featured-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Sản phẩm nổi bật</h3>
          </div>

          {products &&
            products
              .filter((product) => product.tag === 'featured')
              .slice(0, 4)
              .map((product) => {
                return <ProductCard key={product._id} data={product} />;
              })}
        </div>
      </Container>

      {/* FAMOUS PRODUCTS */}
      {/* <Container class1='famous-warpper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img
                className='img-fluid'
                src='/images/famous-1.webp'
                alt='famous'
              />
              <div className='famous-content position-absolute'>
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img
                className='img-fluid'
                src='/images/famous-2.webp'
                alt='famous'
              />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness.</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img
                className='img-fluid'
                src='/images/famous-3.webp'
                alt='famous'
              />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Smartphones</h5>
                <h6 className='text-dark'>Smart Phone 13 Pro. </h6>
                <p className='text-dark'>
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img
                className='img-fluid'
                src='/images/famous-4.webp'
                alt='famous'
              />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Home Speakers</h5>
                <h6 className='text-dark'>Room-filling sound.</h6>
                <p className='text-dark'>
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      {/* SPECIAL PRODUCTS */}
      <Container class1='special-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className='row'>
          {products &&
            products
              .filter((product) => product.tag === 'featured')
              .slice(0, 4)
              .map((product) => {
                return <SpecialProduct key={product._id} data={product} />;
              })}
        </div>
      </Container>

      {/* POPULAR PRODUCTS */}
      <Container class1='popular-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Sản phẩm phổ biến</h3>
          </div>
          <div className='row'>
            {products &&
              products
                .filter((product) => product.tag === 'popular')
                .slice(0, 4)
                .map((product) => {
                  return <ProductCard key={product._id} data={product} />;
                })}
          </div>
        </div>
      </Container>

      {/* MARQUEE */}
      <Container class1='marquee-wrapper py-5'>
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
      </Container>

      {/* OUT LASTEST NEWS */}
      <Container class1='blog-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Bản tin</h3>
          </div>

          {blogs?.length === 0 ? (
            <></>
          ) : (
            blogs?.map((blog, index) => {
              if (index === 3) {
                return null;
              }

              return (
                <div key={blog._id} className='col-3'>
                  <BlogCard blog={blog} />
                </div>
              );
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
