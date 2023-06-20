import React from 'react';
import ReactStarts from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import formatCurrency from '../utils/format_currency';

const ProductCard = (props) => {
  const { grid, data } = props;

  const location = useLocation();
  const dispatch = useDispatch();

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  return (
    <>
      <div
        className={`${
          location.pathname === '/products' ? `gr-${grid}` : 'col-3'
        }`}
      >
        <div className='product-card position-relative'>
          <div className='wishlist-icon position-absolute'>
            <button
              className='border-0 bg-transparent'
              onClick={() => handleAddToWishlist(data._id)}
            >
              <img src={wish} alt='wishlist' />
            </button>
          </div>

          <div className='product-image'>
            <img
              src={data?.images[0]?.url}
              className='img-fluid'
              alt='product'
            />
            <img
              src={data?.images[1]?.url}
              className='img-fluid'
              alt='product'
            />
          </div>

          <div className='product-details'>
            <h6 className='brand'>{data?.brand?.title}</h6>
            <Link
              to={`/product/${data?._id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <h5 className='product-title'>{data?.title}</h5>
            </Link>
            <ReactStarts
              count={5}
              size={24}
              value={data?.ratingsAverage}
              edit={false}
              activeColor='#ffd700'
            />
            <p
              className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></p>
            <p className='price'>{formatCurrency(data?.price)}</p>
          </div>

          <div className='action-bar position-absolute'>
            <div className='d-flex flex-column gap-15'>
              <button className='border-0 bg-transparent'>
                <img src={prodcompare} alt='compare' />
              </button>
              <Link
                to={`/product/${data?._id}`}
                onClick={() => window.scrollTo(0, 0)}
                className='border-0 bg-transparent'
              >
                <img src={view} alt='view' />
              </Link>
              <button className='border-0 bg-transparent'>
                <img src={addcart} alt='addcart' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
