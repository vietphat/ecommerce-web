import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Colors from '../components/Colors';
import Container from '../components/Container';
import { getAllProducts } from '../features/products/productSlice';

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);

  return (
    <>
      <Meta title='Sản phẩm' />
      <BreadCrumb title='Sản phẩm' />
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            {/* Loại sản phẩm */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Loại sản phẩm</h3>
              <div>
                <ul className='ps-0'>
                  <li>Đồng hồ</li>
                  <li>TV</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Bộ lọc tìm kiếm</h3>
              <div>
                {/* Avalabilities */}
                <h5 className='sub-title'>Availabilities</h5>
                <div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id=''
                    />
                    <label className='form-check-label' htmlFor=''>
                      In Stock (1 )
                    </label>
                  </div>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id=''
                    />
                    <label className='form-check-label' htmlFor=''>
                      Out Of Stock (0)
                    </label>
                  </div>
                </div>

                {/* Giá */}
                <h5 className='sub-title'>Giá</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className='form-floating'>
                    <input
                      className='form-control'
                      type='email'
                      id='floatingInput'
                      placeholder='name@example.com'
                    />
                    <label htmlFor='floatingInput'>From</label>
                  </div>

                  <div className='form-floating'>
                    <input
                      className='form-control'
                      type='email'
                      id='floatingInput1'
                      placeholder='name@example.com'
                    />
                    <label htmlFor='floatingInput1'>To</label>
                  </div>
                </div>

                {/* Màu sắc */}
                <h5 className='sub-title'>Màu sắc</h5>
                <div>
                  <div className='d-flex flex-wrap'>
                    <Colors colors={[]} />
                  </div>
                </div>

                <h5 className='sub-title'>Kích thước</h5>
                <div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='size-s'
                    />
                    <label className='form-check-label' htmlFor='size-s'>
                      S (2)
                    </label>
                  </div>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='size-m'
                    />
                    <label className='form-check-label' htmlFor='size-m'>
                      M (6)
                    </label>
                  </div>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='size-l'
                    />
                    <label className='form-check-label' htmlFor='size-l'>
                      L (10)
                    </label>
                  </div>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='size-l'
                    />
                    <label className='form-check-label' htmlFor='size-l'>
                      XL (4)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tags */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Tags thịnh hành</h3>

              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Tai nghe
                  </span>

                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Laptop
                  </span>

                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Điện thoại
                  </span>

                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Sạc
                  </span>
                </div>
              </div>
            </div>

            {/* Random Product */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Sản phẩm ngẫu nhiên</h3>
              <div>
                <div className='random-products mb-3 d-flex'>
                  <div className='w-50'>
                    <img
                      className='img-fluid'
                      src='/images/watch.jpg'
                      alt='watch'
                    />
                  </div>

                  <div className='w-50'>
                    <h5>
                      Kids Headphone Bulk 10 Pack Multi Color For Students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor='#ffd700'
                    />
                    <b>$300</b>
                  </div>
                </div>

                <div className='random-products d-flex'>
                  <div className='w-50'>
                    <img
                      className='img-fluid'
                      src='/images/watch.jpg'
                      alt='watch'
                    />
                  </div>

                  <div className='w-50'>
                    <h5>
                      Kids Headphone Bulk 10 Pack Multi Color For Students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor='#ffd700'
                    />
                    <b>$300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-10'>
                  <p className='mb-0 d-block' style={{ width: '100px' }}>
                    Xếp theo:{' '}
                  </p>
                  <select className='form-control form-select' name='' id=''>
                    <option value='manual'>Sản phẩm nổi bật</option>
                    <option value='best-selling'>Bán chạy</option>
                    <option value='title-ascending'>
                      Theo thứ tự chữ cái, A-Z
                    </option>
                    <option value='title-descending'>
                      Theo thứ tự chữ cái, Z-A
                    </option>
                    <option value='price-ascending'>
                      Theo giá, thấp đến cao
                    </option>
                    <option value='price-descending'>
                      Theo giá, cao đến thấp
                    </option>
                    <option value='created-ascending'>
                      Theo ngày, cũ đến mới
                    </option>
                    <option value='created-descending'>
                      Theo ngày, mơi đến cũ
                    </option>
                  </select>
                </div>

                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0'>21 sản phẩm</p>
                  <div className='d-flex align-items-center gap-10 grid'>
                    <img
                      onClick={() => setGrid(3)}
                      src='/images/gr4.svg'
                      alt='grid'
                      className='d-block img-fluid'
                    />
                    <img
                      onClick={() => setGrid(4)}
                      src='/images/gr3.svg'
                      alt='grid'
                      className='d-block img-fluid'
                    />
                    <img
                      onClick={() => setGrid(6)}
                      src='/images/gr2.svg'
                      alt='grid'
                      className='d-block img-fluid'
                    />
                    <img
                      onClick={() => setGrid(12)}
                      src='/images/gr.svg'
                      alt='grid'
                      className='d-block img-fluid'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='products-list pb-5'>
              <div className='d-flex gap-10 flex-wrap'>
                {products &&
                  products?.map((product) => {
                    return (
                      <ProductCard
                        key={product._id}
                        grid={grid}
                        data={product}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
