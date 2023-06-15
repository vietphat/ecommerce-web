import { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import watch from '../images/watch.jpg';
import Container from '../components/Container';
import { getCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <Meta title='Giỏ hàng' />
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
              <div className='text-center fs-5'>Không có sản phẩm nào</div>
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
                        <p>{item?.product?.title}</p>
                        <p className='d-flex gap-2'>
                          Màu:
                          <li
                            style={{
                              listStyle: 'none',
                              backgroundColor: item?.color?.title,
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                            }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className='cart-col-2'>
                      <h5 className='price'>{item?.product?.price} đ</h5>
                    </div>
                    <div className='cart-col-3 d-flex align-items-center gap-15'>
                      <div>
                        <input
                          className='form-control'
                          type='number'
                          min={1}
                          max={item?.product?.quantity}
                          value={item?.quantity}
                        />
                      </div>
                      <div>
                        <AiFillDelete className='text-danger' />
                      </div>
                    </div>
                    <div className='cart-col-4'>
                      <h5 className='price'>
                        {item?.product?.price * item?.quantity} đ
                      </h5>
                    </div>
                  </div>
                );
              })
            )}

            <div className='col-12 py-2 mt-4'>
              <div className='d-flex justify-content-between align-items-baseline'>
                <Link to='/products' className='button'>
                  Tiếp tục mua sắm
                </Link>
                <div className='d-flex flex-column align-items-end'>
                  <h4>Tổng cộng: 5.000.000đ</h4>
                  <p>Khách được quyền yêu cầu người vận chuyển cho xem hàng</p>
                  <Link to='/checkout' className='button'>
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
