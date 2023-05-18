import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const SingleProduct = () => {
  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: 'https://icdn.dantri.com.vn/thumb_w/960/2021/03/31/5-hot-girl-goi-cam-thu-hut-su-chu-y-trong-thang-3-docx-1617123616212.jpeg',
  };
  const [orderedProduct, setOrderedProduct] = useState(true);

  return (
    <>
      <Meta title='Tên sản phẩm' />
      <BreadCrumb title='Tên sản phẩm' />

      {/* Phần thông tin sản phẩm */}
      <div className='main-product-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl p-3'>
          <div className='row'>
            {/* Phần hình ảnh */}
            <div className='col-6'>
              <div className='main-product-image'>
                <div className='d-flex justify-content-center'>
                  <ReactImageZoom {...props} />
                </div>
              </div>

              <div className='other-product-images d-flex flex-wrap gap-15'>
                <div>
                  <img
                    src='https://icdn.dantri.com.vn/thumb_w/960/2021/03/31/5-hot-girl-goi-cam-thu-hut-su-chu-y-trong-thang-3-docx-1617123616212.jpeg'
                    alt='product'
                    className='img-fluid'
                  />
                </div>
                <div>
                  <img
                    src='https://icdn.dantri.com.vn/thumb_w/960/2021/03/31/5-hot-girl-goi-cam-thu-hut-su-chu-y-trong-thang-3-docx-1617123616212.jpeg'
                    alt='product'
                    className='img-fluid'
                  />
                </div>
                <div>
                  <img
                    src='https://icdn.dantri.com.vn/thumb_w/960/2021/03/31/5-hot-girl-goi-cam-thu-hut-su-chu-y-trong-thang-3-docx-1617123616212.jpeg'
                    alt='product'
                    className='img-fluid'
                  />
                </div>
                <div>
                  <img
                    src='https://icdn.dantri.com.vn/thumb_w/960/2021/03/31/5-hot-girl-goi-cam-thu-hut-su-chu-y-trong-thang-3-docx-1617123616212.jpeg'
                    alt='product'
                    className='img-fluid'
                  />
                </div>
              </div>
            </div>

            {/* Phần thông tin */}
            <div className='col-6'>
              <div className='main-product-details'>
                <div className='border-bottom'>
                  <h3 className='title'>
                    Kids headphone bulk 10 pack multi colored for students
                  </h3>
                </div>

                <div className='border-bottom py-3'>
                  <p className='price'>2.500.000đ</p>
                  <div className='d-flex align-items-center gap-10'>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor='#ffd700'
                    />
                    <p className='mb-0 t-review'>(2 lượt đánh giá)</p>
                  </div>

                  <a className='review-btn' href='#review'>
                    Viết đánh giá
                  </a>
                </div>

                <div className='py-3'>
                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Loại: </h3>
                    <p className='product-data'>Tai nghe</p>
                  </div>

                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Thương hiệu: </h3>
                    <p className='product-data'>Sony</p>
                  </div>

                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Danh mục: </h3>
                    <p className='product-data'>Tai nghe</p>
                  </div>

                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Tags: </h3>
                    <p className='product-data'>Tai nghe</p>
                  </div>

                  <div className='d-flex gap-10 align-items-center my-2'>
                    <h3 className='product-heading'>Tình trạng: </h3>
                    <p className='product-data'>Còn hàng</p>
                  </div>

                  <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                    <h3 className='product-heading'>Kích thước: </h3>
                    <div className='d-flex flex-wrap gap-15'>
                      <span className='badge border border-1 bg-white text-dark border-secondary'>
                        S
                      </span>
                      <span className='badge border border-1 bg-white text-dark border-secondary'>
                        M
                      </span>
                      <span className='badge border border-1 bg-white text-dark border-secondary'>
                        XL
                      </span>
                      <span className='badge border border-1 bg-white text-dark border-secondary'>
                        XXL
                      </span>
                    </div>
                  </div>

                  <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                    <h3 className='product-heading'>Màu sắc: </h3>
                    <Color />
                  </div>

                  <div className='d-flex gap-10 flex-row align-items-center mt-2 mb-3 gap-15'>
                    <h3 className='product-heading'>Số lượng: </h3>
                    <div>
                      <input
                        type='number'
                        name=''
                        id=''
                        min={1}
                        max={10}
                        style={{ width: '70px' }}
                        className='form-control'
                      />
                    </div>

                    <div className='d-flex align-items-center gap-20 ms-5'>
                      <button className='button border-0' type='submit'>
                        Thêm vào giỏ hàng
                      </button>
                      <button to='/signup' className='button signup'>
                        Mua ngay
                      </button>
                    </div>
                  </div>

                  <div className='d-flex align-items-center gap-15'>
                    <div>
                      <a href='/'>
                        <TbGitCompare className='fs-5 me-2' />
                        So sánh
                      </a>
                    </div>
                    <div>
                      <a href='/'>
                        <AiOutlineHeart className='fs-5 me-2' />
                        Thích
                      </a>
                    </div>
                  </div>

                  <div className='d-flex flex-column gap-10 my-3'>
                    <h3 className='product-heading'>Vận chuyển và hoàn trả</h3>
                    <p className='product-data'>
                      Vận chuyển miễn phí và có thể trả lại đơn hàng trong 5
                      ngày.
                      <br />
                      Vận chuyển toàn quốc.
                    </p>
                  </div>

                  <div className='d-flex gap-10 align-items-center my-3'>
                    <h3 className='product-heading'>Link sản phẩm</h3>
                    <a
                      href='javascipt:void(0);'
                      onClick={() => {
                        copyToClipboard('test2');
                      }}
                    >
                      Sao chép
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần mô tả sản phẩm */}
      <div className='description-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h4>Mô tả</h4>
              <div className='bg-white p-3'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, quaerat! Iste, illo maiores? Dolorum, adipisci! Fuga
                  iste est eum? Nobis nisi, blanditiis modi soluta a velit nemo
                  assumenda illo enim!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần đánh giá */}
      <div id='review' className='reviews-wrapper home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3>Đánh giá</h3>
              <div className='review-inner-wrapper'>
                <div className='review-head d-flex justify-content-between align-items-end'>
                  <div>
                    <h4 className='mb-2'>Đánh giá của khách hàng</h4>
                    <div className='d-flex align-items-center gap-10'>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor='#ffd700'
                      />

                      <p className='mb-0'>2 lượt đánh giá</p>
                    </div>
                  </div>

                  {orderedProduct && (
                    <div>
                      <a
                        className='text-dark text-decoration-underline'
                        href=''
                      >
                        Viết đánh giá
                      </a>
                    </div>
                  )}
                </div>

                <div className='review-form py-4'>
                  <h4 className='mb-2'>Viết đánh giá</h4>
                  <form action='' className='d-flex flex-column gap-15'>
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor='#ffd700'
                      />
                    </div>
                    <div>
                      <textarea
                        className='w-100 form-control'
                        cols={30}
                        rows={5}
                        placeholder='Nội dung'
                      ></textarea>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <button className='button border-0'>Gửi đánh giá</button>
                    </div>
                  </form>
                </div>

                <div className='reviews mt-4'>
                  <div className='review'>
                    <div className='d-flex gap-10 align-items-center'>
                      <h6 className='mb-0'>Cabral</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor='#ffd700'
                      />
                    </div>
                    <p className='mt-3'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam iusto molestias voluptatibus maiores voluptas
                      accusamus aliquid repellendus expedita quae ab eius
                      numquam odit autem impedit incidunt ratione, animi
                      architecto soluta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Phần gợi ý sản phẩm phổ biến */}
      <section className='popular-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Sản phẩm nổi bật</h3>
            </div>
            <div className='row'>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
