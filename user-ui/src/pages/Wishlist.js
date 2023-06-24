import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { addToWishlist, getWishlist } from '../features/wishlist/wishlistSlice';
import format_currency from '../utils/format_currency';

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const { wishlist } = useSelector((state) => state.wishlist);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  return (
    <>
      <Meta title={`Techzone | Danh sách yêu thích`} />
      <BreadCrumb title='Danh sách yêu thích' />
      <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          {wishlist?.length === 0 ? (
            <div className='text-center fs-5'>
              Chưa có sản phẩm yêu thích nào
            </div>
          ) : (
            wishlist?.map((product) => {
              return (
                <div className='col-3' key={product._id}>
                  <div className='wishlist-card position-relative'>
                    <img
                      src='/images/cross.svg'
                      alt='cross'
                      className='position-absolute cross img-fluid'
                      onClick={() => handleRemoveFromWishlist(product._id)}
                    />
                    <div className='wishlist-card-image'>
                      <img
                        className='img-fluid w-100'
                        src={`${product?.images[0]?.url}`}
                        alt='watch'
                      />
                    </div>

                    <div className='py-3 px-3'>
                      <Link
                        to={`/product/${product?._id}`}
                        className='title text-dark fw-bolder'
                      >
                        {product?.title}
                      </Link>
                      <h6 className='price fw-bold text-danger'>
                        {format_currency(product?.price)}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
