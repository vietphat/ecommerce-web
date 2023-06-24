import { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import {
  deleteCartItem,
  getCart,
  updateQuantity,
} from '../features/cart/cartSlice';
import formatCurrency from '../utils/format_currency';
import Colors from '../components/Colors';

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { cart, totalPrice } = useSelector((state) => state.cart);

  const handleChangeQuantity = (cartItem, quantity) => {
    if (quantity > cartItem.quantity + cartItem.product.quantity) {
      alert(
        'Cập nhật giỏ hàng thất bại. Số lượng cộng thêm vào giỏ hàng nhiều hơn số lượng sản phẩm tồn kho.'
      );
    } else {
      const data = { id: cartItem._id, quantity };
      dispatch(updateQuantity(data));
    }
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(deleteCartItem(cartId));
  };

  return (
    <>
      <Meta title='Techzone | Giỏ hàng' />
      <BreadCrumb title='Giỏ hàng' />

      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            {/* tiêu đề */}
            <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
              <h4 className='cart-col-1'>Sản phẩm</h4>
              <h4 className='cart-col-2'>Giá</h4>
              <h4 className='cart-col-3'>Số lượng</h4>
              <h4 className='cart-col-4'>Thành tiền</h4>
            </div>

            {/* sản phẩm */}
            {cart?.length === 0 ? (
              <div className='text-center fs-5'>Giỏ hàng trống</div>
            ) : (
              cart?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'
                  >
                    <div className='cart-col-1 gap-15 d-flex align-items-center'>
                      <div className='w-25'>
                        <img
                          src={item?.product?.images[0]?.url}
                          alt='product'
                          className='img-fluid'
                        />
                      </div>
                      <div className='w-25'>
                        <Link
                          className='cart-item-link text-dark fw-bold'
                          to={`/product/${item?.product?._id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          {item?.product?.title}
                        </Link>
                        <p className='d-flex gap-2 mt-2'>
                          Màu sắc:
                          <Colors colors={item?.product?.colors} />
                        </p>
                      </div>
                    </div>
                    <div className='cart-col-2'>
                      <h5 className='price'>
                        {formatCurrency(item?.product?.price)}
                      </h5>
                    </div>
                    <div className='cart-col-3 d-flex align-items-center gap-15'>
                      <div>
                        <input
                          className='form-control'
                          type='number'
                          min={1}
                          max={item?.product?.quantity}
                          value={item?.quantity}
                          onChange={(e) => {
                            if (
                              e.target.value <= 0 ||
                              e.target.value > item?.product?.quantity
                            )
                              return;
                            handleChangeQuantity(item, e.target.value);
                          }}
                        />
                      </div>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteCartItem(item._id)}
                      >
                        <AiFillDelete className='text-danger fs-5' />
                      </div>
                    </div>
                    <div className='cart-col-4'>
                      <h5 className='price'>
                        {formatCurrency(item?.product?.price * item?.quantity)}
                      </h5>
                    </div>
                  </div>
                );
              })
            )}

            <div className='col-12 py-2 mt-4'>
              <div className='d-flex justify-content-between align-items-baseline'>
                <Link
                  to='/products'
                  className='button'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Tiếp tục mua sắm
                </Link>
                {cart?.length !== 0 && (
                  <div className='d-flex flex-column align-items-end'>
                    <h4>Tổng cộng: {formatCurrency(totalPrice)}</h4>
                    <p>
                      Khách được quyền yêu cầu người vận chuyển cho xem hàng
                    </p>
                    <Link
                      to='/checkout'
                      className='button'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Thanh toán
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
