import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { getAllProducts } from '../features/products/productSlice';
import { getBrands } from '../features/brands/brandSlice';
import { getProductCategories } from '../features/productCategories/productCategorySlice';
import formatCurrency from '../utils/format_currency';

const OurStore = () => {
  const [grid, setGrid] = useState(4);

  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [sort, setSort] = useState('createdAt');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts({ brand, category, tag, from, to, sort }));
  }, [brand, category, tag, from, to, sort, dispatch]);

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.productCategory);
  const { brands } = useSelector((state) => state.brand);

  return (
    <>
      <Meta title='Techzone | Sản phẩm' />
      <BreadCrumb title='Sản phẩm' />
      <Container class1='store-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            {/* Loại sản phẩm */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Loại sản phẩm</h3>
              <div>
                <ul className='ps-0'>
                  {categories &&
                    categories.map((c) => {
                      return (
                        <li
                          onClick={() => {
                            setCategory((state) => {
                              if (state === c._id) return '';
                              else return c._id;
                            });
                          }}
                          key={c._id}
                        >
                          <span
                            className={
                              c._id === category && `fw-bold bg-dark p-1 border`
                            }
                          >
                            {c.title}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Bộ lọc tìm kiếm</h3>
              <div>
                {/* Giá */}
                <h5 className='sub-title'>Giá</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className='form-floating flex-grow-1'>
                    <input
                      id='floatingInput'
                      className='form-control'
                      type='number'
                      min={0}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                    <label htmlFor='floatingInput'>From (VNĐ)</label>
                  </div>

                  <div className='form-floating flex-grow-1'>
                    <input
                      id='floatingInput1'
                      className='form-control'
                      type='number'
                      min={0}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                    <label htmlFor='floatingInput1'>To (VNĐ)</label>
                  </div>
                </div>
              </div>

              {/* Product Tags */}
              <h3 className='filter-title mt-4 mb-3'>Tags thịnh hành</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  {['featured', 'popular', 'special'].map((t, i) => {
                    return (
                      <span
                        key={i}
                        style={{ cursor: 'pointer' }}
                        className={`badge bg-${
                          tag === t ? 'dark' : 'light'
                        } text-secondary rounded-3 py-2 px-3`}
                        onClick={(e) => {
                          setTag((state) => {
                            if (state === t) return '';
                            else return e.target.innerText;
                          });
                        }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Brands */}
              <h3 className='filter-title mt-4 mb-3'>Thương hiệu</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  {brands &&
                    brands.map((b) => {
                      return (
                        <span
                          key={b._id}
                          style={{ cursor: 'pointer' }}
                          className={`badge bg-${
                            brand === b._id ? 'dark' : 'light'
                          } text-secondary rounded-3 py-2 px-3`}
                          onClick={() => {
                            setBrand((state) => {
                              if (state === b._id) return '';
                              else return b._id;
                            });
                          }}
                        >
                          {b.title}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Random Product */}
            <div className='filter-card mb-3'>
              <h3 className='filter-title mb-3'>Sản phẩm gợi ý</h3>
              <div>
                {products &&
                  [...products]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 2)
                    .map((p) => {
                      return (
                        <div
                          key={p._id}
                          className='random-products mb-3 d-flex'
                        >
                          <div className='w-50'>
                            <img
                              className='img-fluid'
                              src={p.images[0].url}
                              width='90%'
                              alt='product'
                            />
                          </div>

                          <div className='w-50'>
                            <Link
                              to={`/product/${p._id}`}
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              {p.title}
                            </Link>
                            <ReactStars
                              count={5}
                              size={24}
                              value={p.ratingsAverage}
                              edit={false}
                              activeColor='#ffd700'
                            />
                            <b>{formatCurrency(p.price)}</b>
                          </div>
                        </div>
                      );
                    })}
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
                  <select
                    onChange={(e) => setSort(e.target.value)}
                    className='form-control form-select'
                  >
                    <option value='title'>Theo thứ tự chữ cái, A-Z</option>
                    <option value='-title'>Theo thứ tự chữ cái, Z-A</option>
                    <option value='price'>Theo giá, thấp đến cao</option>
                    <option value='-price'>Theo giá, cao đến thấp</option>
                    <option value='createdAt'>Theo ngày, cũ đến mới</option>
                    <option value='-createdAt'>Theo ngày, mơi đến cũ</option>
                  </select>
                </div>

                <div className='d-flex align-items-center gap-10'>
                  <p className='totalproducts mb-0'>
                    {products?.length} sản phẩm
                  </p>
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
