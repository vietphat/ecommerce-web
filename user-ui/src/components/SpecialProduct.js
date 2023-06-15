import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = ({ data }) => {
  return (
    <>
      <div className='col-6 mb-3'>
        <div className='special-product-card'>
          <div className='d-flex justify-content-between'>
            <div>
              <img
                src={data?.images[0]?.url}
                className='img-fluid'
                alt='product'
              />
            </div>
            <div className='special-product-content'>
              <h5 className='brand'>{data?.brand?.title}</h5>
              <h6 className='title'>{data?.title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={data?.ratingsAverage}
                edit={false}
                activeColor='#ffd700'
              />
              <p className='price'>
                <span className='red-p'>{data?.price} đ</span> &nbsp;{' '}
                <strike>{data?.price} đ</strike>
              </p>
              <div className='discount-till d-flex align-items-center gap-10'>
                <p className='mb-0'>
                  <b>5 </b>days
                </p>
                <div className='d-flex gap-10 align-items-center'>
                  <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                  <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                  <span className='badge rounded-circle p-3 bg-danger'>1</span>
                </div>
              </div>
              <div className='prod-count my-3'>
                <p>Products: {data?.quantity}</p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    style={{ width: '25%' }}
                    aria-valuenow='25'
                    aria-valuemin={data?.quantity}
                    aria-valuemax={data?.quantity + data?.sold}
                  ></div>
                </div>
              </div>
              <Link to={`/product/${data?._id}`} className='button'>
                Xem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
