import { useState, useEffect, useRef } from 'react';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Colors from '../components/Colors';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import {
  createReview,
  getAProducts,
  getAllProducts,
} from '../features/products/productSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart, getCart, updateQuantity } from '../features/cart/cartSlice';
import formatCurrency from '../utils/format_currency';

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const reviewSchema = Yup.object({
  star: Yup.number().required('Số sao là bắt buộc'),
  comment: Yup.string(),
});

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const commentRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAProducts(id));
    dispatch(getAllProducts());
    dispatch(getCart());
  }, [dispatch, id]);

  const { currentProduct } = useSelector((state) => state.product);
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const formik = useFormik({
    initialValues: {
      star: 5,
      comment: '',
    },
    validationSchema: reviewSchema,
    onSubmit: async (values) => {
      const data = {
        productId: currentProduct._id,
        review: values,
      };

      dispatch(createReview(data));
    },
  });

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: currentProduct?.images[0]?.url
      ? currentProduct?.images[0]?.url
      : '/images/default-image.webp',
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const handleAddToCart = () => {
    // nếu trong giỏ hàng đã có sản phẩm này, thêm số lượng sp
    const existedCartIndex = cart?.findIndex(
      (c) => c.product._id === currentProduct._id
    );

    if (cart?.length > 0 && existedCartIndex !== -1) {
      // nếu số lượng thêm vào + số lượng có sẵn trong giỏ hàng > số lượng trong kho
      // => alert người dùng không thể cập nhật giỏ hàng
      if (
        quantity + cart[existedCartIndex].quantity >
        cart[existedCartIndex].product.quantity
      ) {
        alert(
          'Cập nhật giỏ hàng thất bại. Số lượng cộng thêm vào giỏ hàng nhiều hơn số lượng sản phẩm tồn kho.'
        );
        return;
        // ngược lại gọi api cập nhật số lượng với số lượng cộng thêm từ input quantity
      } else {
        const data = {
          id: cart[existedCartIndex]._id,
          quantity: quantity + cart[existedCartIndex].quantity,
        };
        // alert('Cập nhật số lượng' + JSON.stringify(data));
        dispatch(updateQuantity(data));
        return;
      }
    }

    if (quantity > currentProduct.quantity) {
      alert('Số lượng không được chọn quá số lượng trong kho');
      return;
    }

    dispatch(
      addToCart({
        product: currentProduct?._id,
        color: currentProduct.colors[0],
        price: currentProduct?.price,
        quantity,
      })
    );
  };

  const handleFocusCommentInput = (e) => {
    e.preventDefault();
    commentRef.current.focus();
  };

  return (
    <>
      {!currentProduct ? (
        <div className='text-center fs-5 my-5'>Loading...</div>
      ) : (
        <>
          <Meta title={`Techzone | ${currentProduct?.title}`} />
          <BreadCrumb title={currentProduct?.title} />

          {/* Phần thông tin sản phẩm */}
          <Container class1='main-product-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              {/* Phần hình ảnh */}
              <div className='col-6'>
                <div className='main-product-image'>
                  <div className='d-flex justify-content-center'>
                    <ReactImageZoom {...props} />
                  </div>
                </div>

                <div className='other-product-images d-flex flex-wrap gap-15'>
                  {currentProduct?.images.map((img, i) => {
                    return (
                      <div key={i}>
                        <img
                          src={img.url}
                          alt='product'
                          className='img-fluid'
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phần thông tin */}
              <div className='col-6'>
                <div className='main-product-details'>
                  <div className='border-bottom'>
                    <h3 className='title'>{currentProduct?.title}</h3>
                  </div>

                  <div className='border-bottom py-3'>
                    <p className='price'>
                      {formatCurrency(currentProduct?.price)}
                    </p>
                    <div className='d-flex align-items-center gap-10'>
                      <ReactStars
                        count={5}
                        size={24}
                        value={currentProduct?.ratingsAverage}
                        edit={false}
                        activeColor='#ffd700'
                      />
                      <p className='mb-0 t-review'>
                        ({currentProduct?.ratingsQuantity} lượt đánh giá)
                      </p>
                    </div>

                    <button
                      className='review-btn border-0 bg-transparent'
                      onClick={(e) => handleFocusCommentInput(e)}
                      type='button'
                    >
                      Viết đánh giá
                    </button>
                  </div>

                  <div className='py-3'>
                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Loại: </h3>
                      <p className='product-data'>
                        {currentProduct?.category.title}
                      </p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Thương hiệu: </h3>
                      <p className='product-data'>
                        {currentProduct?.brand.title}
                      </p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Danh mục: </h3>
                      <p className='product-data'>
                        {currentProduct?.category.title}
                      </p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Tags: </h3>
                      <p className='product-data'>{currentProduct?.tag}</p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Kho: </h3>
                      <p className='product-data'>
                        {currentProduct.quantity === 0
                          ? 'Hết hàng'
                          : currentProduct.quantity}
                      </p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-2'>
                      <h3 className='product-heading'>Đã bán: </h3>
                      <p className='product-data'>{currentProduct.sold}</p>
                    </div>

                    <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                      <h3 className='product-heading'>Màu sắc: </h3>
                      <Colors colors={currentProduct.colors} />
                    </div>

                    <div className='d-flex gap-10 flex-row align-items-center mt-2 mb-3 gap-15'>
                      <h3 className='product-heading'>Số lượng: </h3>
                      <div>
                        <input
                          type='number'
                          min={1}
                          max={currentProduct.quantity}
                          style={{ width: '70px' }}
                          className='form-control'
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(Number(e.target.value));
                          }}
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode < 48 || charCode > 57) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>

                      <div className='d-flex align-items-center gap-20 ms-5'>
                        <button
                          className='button border-0'
                          type='submit'
                          onClick={handleAddToCart}
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <button to='/signup' className='button signup'>
                          Mua ngay
                        </button>
                      </div>
                    </div>

                    <div className='d-flex align-items-center gap-15'>
                      <div>
                        <button
                          className='border-0 bg-transparent like-btn'
                          onClick={() =>
                            handleAddToWishlist(currentProduct._id)
                          }
                        >
                          {wishlist
                            .map((product) => product._id)
                            .includes(currentProduct._id) ? (
                            <div className='text-danger fs-6'>
                              <AiOutlineHeart
                                color='red'
                                className='fs-5 me-2'
                              />
                              Gỡ khỏi danh sách yêu thích
                            </div>
                          ) : (
                            <div className=' fs-6'>
                              <AiOutlineHeart className='fs-5 me-2' />
                              Thêm vào danh sách yêu thích
                            </div>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className='d-flex flex-column gap-10 my-3'>
                      <h3 className='product-heading'>
                        Vận chuyển và hoàn trả
                      </h3>
                      <p className='product-data'>
                        Vận chuyển miễn phí và có thể trả lại đơn hàng trong 5
                        ngày.
                        <br />
                        Vận chuyển toàn quốc.
                      </p>
                    </div>

                    <div className='d-flex gap-10 align-items-center my-3'>
                      <h3 className='product-heading'>Link sản phẩm</h3>
                      <button
                        className='border-0 bg-transparent like-btn'
                        href='javascipt:void(0);'
                        onClick={() => {
                          copyToClipboard(
                            window.location.origin + location.pathname
                          );
                        }}
                      >
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Phần mô tả sản phẩm */}
          <Container class1='description-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              <div className='col-12'>
                <h4>Mô tả sản phẩm</h4>
                <div className='bg-white p-3'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: currentProduct?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </Container>

          {/* Phần đánh giá */}
          <Container id='review' class1='reviews-wrapper home-wrapper-2'>
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
                          value={currentProduct?.ratingsAverage}
                          edit={false}
                          activeColor='#ffd700'
                        />

                        <p className='mb-0'>
                          {currentProduct?.ratingsQuantity} lượt đánh giá
                        </p>
                      </div>
                    </div>

                    <div>
                      <button
                        className='text-dark text-decoration-underline border-0 bg-transparent'
                        type='button'
                        onClick={(e) => handleFocusCommentInput(e)}
                      >
                        Viết đánh giá
                      </button>
                    </div>
                  </div>

                  <div className='review-form py-4'>
                    <h4 className='mb-2'>Viết đánh giá</h4>
                    <form
                      onSubmit={formik.handleSubmit}
                      className='d-flex flex-column gap-15'
                    >
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={formik.values.star}
                          edit={true}
                          activeColor='#ffd700'
                          onChange={(star) =>
                            formik.setFieldValue('star', star)
                          }
                        />
                      </div>

                      <div>
                        <textarea
                          ref={commentRef}
                          className='w-100 form-control'
                          cols={30}
                          rows={5}
                          placeholder='Nội dung'
                          value={formik.values.comment}
                          onChange={formik.handleChange('comment')}
                          onBlur={formik.handleBlur('comment')}
                        ></textarea>
                      </div>

                      <div className='d-flex justify-content-end'>
                        <button type='submit' className='button border-0'>
                          Đăng đánh giá
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className='reviews mt-4'>
                    {currentProduct.ratings.length > 0 ? (
                      currentProduct.ratings.map((review) => {
                        return (
                          <div key={review._id} className='review'>
                            <div className='d-flex gap-10 align-items-center'>
                              <h6 className='mb-0'>
                                {review.postedBy.firstName +
                                  ' ' +
                                  review.postedBy.lastName}
                              </h6>
                              <ReactStars
                                count={5}
                                size={24}
                                value={review.star}
                                edit={false}
                                activeColor='#ffd700'
                              />
                            </div>
                            <p className='mt-3'>{review.comment}</p>
                          </div>
                        );
                      })
                    ) : (
                      <div className='text-center fs-5'>
                        - Chưa có đánh giá -
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/*  Phần gợi ý sản phẩm nổi bật */}
          <Container class1='popular-wrapper home-wrapper-2 py-5'>
            <div className='row'>
              <div className='col-12'>
                <h3 className='section-heading'>Sản phẩm nổi bật</h3>
              </div>
              <div className='row'>
                {products
                  .filter((p) => p.tag === 'featured')
                  .splice(0, 4)
                  .map((p) => {
                    return <ProductCard key={p._id} data={p} />;
                  })}
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleProduct;
