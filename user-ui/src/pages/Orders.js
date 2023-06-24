import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { getMyOrders } from '../features/order/orderSlice';
import formatCurrency from '../utils/format_currency';
import ORDER_STATUS, { ORDER_STATUS_BADGES } from '../utils/order_status';
import Meta from '../components/Meta';

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  return (
    <>
      <Meta title='Techzone | Đơn hàng của tôi' />
      <BreadCrumb title='Đơn hàng của tôi' />

      <Container className='cart-wrapper home-wrapper-2 py-5'>
        {orders.length > 0 ? (
          <div className='row my-3 mb-5'>
            <h2 className='fs-10 mb-3'>Các đơn đặt hàng</h2>

            {/* Content */}
            {orders.map((order, index) => (
              <div className='border border-dark rounded-3 p-3 my-3'>
                <div className='row px-3'>
                  <div className='col-3'>
                    <p className='fs-7 fw-bolder text-decoration-underline'>
                      Id
                    </p>
                  </div>

                  <div className='col-3'>
                    <p className='fs-7 fw-bolder text-decoration-underline'>
                      Thành tiền
                    </p>
                  </div>

                  <div className='col-3'>
                    <p className='fs-7 fw-bolder text-decoration-underline'>
                      Thành tiền sau giảm giá
                    </p>
                  </div>

                  <div className='col-3'>
                    <p className='fs-7 fw-bolder text-decoration-underline'>
                      Thành tiền
                    </p>
                  </div>
                </div>
                <div
                  key={order._id}
                  className='col-12 text-dark'
                  // style={{
                  //   backgroundColor: index % 2 === 0 ? '#d3d5d5' : '#30111142',
                  //   borderRadius: '10px',
                  // }}
                >
                  <div className='row p-3'>
                    <div className='col-3'>
                      <p className='mb-0 fst-italic'>{order._id}</p>
                    </div>

                    <div className='col-3'>
                      <p className='mb-0 fst-italic'>
                        {formatCurrency(order.totalPrice)}
                      </p>
                    </div>

                    <div className='col-3'>
                      <p className='mb-0 fst-italic'>
                        {formatCurrency(order.totalPriceAfterDiscount)}
                      </p>
                    </div>

                    <div className='col-3'>
                      <p
                        className={`mb-0 fst-italic text-decoration-underline ${
                          ORDER_STATUS_BADGES[order.orderStatus]
                        }`}
                      >
                        {ORDER_STATUS[order.orderStatus]}
                      </p>
                    </div>

                    {/* Sản phẩm */}
                    <div className='col-12'>
                      <div className='row pt-3'>
                        <div className='col-3'>
                          <p className='fs-7 fw-bolder text-decoration-underline'>
                            Tên sản phẩm
                          </p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-7 fw-bolder text-decoration-underline'>
                            Màu sắc
                          </p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-7 fw-bolder text-decoration-underline'>
                            Số lượng
                          </p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-7 fw-bolder text-decoration-underline'>
                            Giá
                          </p>
                        </div>
                      </div>

                      {order.orderItems.map((item) => (
                        <div key={item._id} className='row'>
                          <div className='col-3'>
                            <Link
                              className='text-dark fw-bold'
                              onClick={() => window.scrollTo(0, 0)}
                              to={`/product/${item.product._id}`}
                            >
                              {item.product.title}
                            </Link>
                          </div>

                          <div className='col-3'>
                            <li
                              style={{
                                listStyle: 'none',
                                backgroundColor: item.color.title,
                                border: '1px solid #111',
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                              }}
                            />
                          </div>

                          <div className='col-3'>
                            <p>{item.quantity}</p>
                          </div>

                          <div className='col-3'>
                            <p>{formatCurrency(item.product.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center fs-5'>Chưa có đơn đặt hàng nào</div>
        )}
      </Container>
    </>
  );
};

export default Orders;
