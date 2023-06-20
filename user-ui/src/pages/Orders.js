import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { getMyOrders } from '../features/order/orderSlice';
import formatCurrency from '../utils/format_currency';
import ORDER_STATUS from '../utils/order_status';

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  console.log(orders);

  return (
    <>
      <BreadCrumb title='Techzone | Đơn hàng' />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        {orders.length > 0 ? (
          <div className='row'>
            <h2 className='fs-10 mb-3'>Các đơn đặt hàng</h2>
            {/* Header */}
            <div className='col-12'>
              <div className='row'>
                <div className='col-3'>
                  <h5>Id</h5>
                </div>

                <div className='col-3'>
                  <h5>Thành tiền</h5>
                </div>

                <div className='col-3'>
                  <h5>Thành tiền sau khi khấu trừ</h5>
                </div>

                <div className='col-3'>
                  <h5>Trạng thái</h5>
                </div>
              </div>
            </div>

            {/* Content */}
            {orders.map((order, index) => {
              return (
                <div
                  key={order._id}
                  className='col-12 my-3'
                  style={{
                    backgroundColor: index % 2 === 0 ? '#d3d5d5' : '#c2a5a5',
                    borderRadius: '10px',
                  }}
                >
                  <div className='row p-3'>
                    <div className='col-3'>
                      <p>{order._id}</p>
                    </div>

                    <div className='col-3'>
                      <p>{formatCurrency(order.totalPrice)}</p>
                    </div>

                    <div className='col-3'>
                      <p>{formatCurrency(order.totalPriceAfterDiscount)}</p>
                    </div>

                    <div className='col-3'>
                      <p>{ORDER_STATUS[order.orderStatus]}</p>
                    </div>
                    {/* Sản phẩm */}
                    <div className='col-12'>
                      <div className='row py-3'>
                        <div className='col-3'>
                          <p className='fs-5'>Tên sản phẩm</p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-5'>Màu sắc</p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-5'>Giá</p>
                        </div>

                        <div className='col-3'>
                          <p className='fs-5'>Số lượng</p>
                        </div>
                      </div>

                      {order.orderItems.map((item) => {
                        return (
                          <div key={item._id} className='row'>
                            <div className='col-3'>
                              <p>{item.product.title}</p>
                            </div>

                            <div className='col-3'>
                              <li
                                style={{
                                  listStyle: 'none',
                                  backgroundColor: item.color.title,
                                  width: '25px',
                                  height: '25px',
                                  borderRadius: '50%',
                                }}
                              />
                            </div>

                            <div className='col-3'>
                              <p>{formatCurrency(item.product.price)}</p>
                            </div>

                            <div className='col-3'>
                              <p>{item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center fs-5'>Chưa có đơn đặt hàng nào</div>
        )}
      </Container>
    </>
  );
};

export default Orders;
