import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import format_date from '../utils/format_date';
import format_currency from '../utils/format_currency';
import ORDER_STATUSES from '../utils/order_status';
import { getOrderById, updateOrderStatus } from '../features/order/orderSlice';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const handleEditStatus = (data) => {
    dispatch(updateOrderStatus(data));
  };
  console.log(currentOrder);

  return (
    <div>
      {currentOrder ? (
        <>
          {' '}
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-4 title'>Chi tiết đơn hàng</h3>
            <button
              className='bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
              onClick={goBack}
            >
              <BiArrowBack className='fs-5' /> Go Back
            </button>
          </div>
          <div className='mt-4 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Họ tên người đặt:</h6>
              <p className='mb-0'>
                {currentOrder.user.lastName + ' ' + currentOrder.user.firstName}
              </p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Số điện thoại:</h6>
              <p className='mb-0'>{currentOrder.user.phoneNumber}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Email:</h6>
              <p className='mb-0'>{currentOrder.user.email}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Ngày đặt hàng:</h6>
              <p className='mb-0'>{format_date(currentOrder.createdAt)}</p>
            </div>
            <div className='d-flex flex-column align-items-center gap-3'>
              <h6 className='mb-0'>Sản phẩm</h6>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Tên sản phẩm</th>
                    <th scope='col'>Số lượng</th>
                    <th scope='col'>Đơn giá</th>
                    <th scope='col'>Màu sắc</th>
                    <th scope='col'>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.orderItems.map((orderItem, i) => {
                    return (
                      <tr key={orderItem._id}>
                        <th scope='row'>{i + 1}</th>
                        <td>{orderItem.product.title}</td>
                        <td>{orderItem.quantity}</td>
                        <td>{format_currency(orderItem.price)}</td>
                        <td>
                          <li
                            style={{
                              listStyle: 'none',
                              backgroundColor: orderItem.color.title,
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                            }}
                          />
                        </td>
                        <td>
                          {format_currency(
                            orderItem.price * orderItem.quantity
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Thành tiền:</h6>
              <p className='mb-0'>{format_currency(currentOrder.totalPrice)}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Thành tiền sau khi giảm giá:</h6>
              <p className='mb-0'>
                {format_currency(currentOrder.totalPriceAfterDiscount)}
              </p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Địa chỉ giao hàng:</h6>
              <p className='mb-0'>{currentOrder.shippingInfo.address}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Ghi chú của khách hàng:</h6>
              <p className='mb-0'>{currentOrder.shippingInfo.notes}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Trạng thái:</h6>
              <div>
                <select
                  defaultValue={currentOrder.orderStatus}
                  className='form-control form-select'
                  onChange={(e) =>
                    handleEditStatus({
                      orderId: currentOrder._id,
                      orderStatus: e.target.value,
                    })
                  }
                >
                  <option disabled value='ordered'>
                    {ORDER_STATUSES['ordered']}
                  </option>
                  <option value='approved'>{ORDER_STATUSES['approved']}</option>
                  <option value='processing'>
                    {ORDER_STATUSES['processing']}
                  </option>
                  <option value='shipped'>{ORDER_STATUSES['shipped']}</option>
                  <option value='completed'>
                    {ORDER_STATUSES['completed']}
                  </option>
                  <option value='canceled'>{ORDER_STATUSES['canceled']}</option>
                  <option value='returned'>{ORDER_STATUSES['returned']}</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        'Đang tải...'
      )}
    </div>
  );
};

export default OrderDetails;
