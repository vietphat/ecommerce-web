import { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getOrders, updateOrderStatus } from '../features/order/orderSlice';
import format_date from '../utils/format_date';
import format_currency from '../utils/format_currency';
import ORDER_STATUSES from '../utils/order_status';

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.index - a.index,
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'link',
  },
  {
    title: 'Thành tiền',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  const { token } = user;
  useEffect(() => {
    dispatch(getOrders());
  }, [token, dispatch]);

  const handleEditStatus = (data) => {
    dispatch(updateOrderStatus(data));
  };

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách đơn đặt hàng</h3>
      <div>
        <Table
          columns={columns}
          dataSource={orders.map((order, i) => {
            return {
              key: order._id,
              index: i + 1,
              name: order.user.lastName + ' ' + order.user.firstName,
              email: order.user.email,
              link: (
                <Link
                  to={`/admin/order-details/${order._id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Xem chi tiết
                </Link>
              ),
              amount: format_currency(order.totalPriceAfterDiscount),
              status: (
                <select
                  defaultValue={order.orderStatus}
                  className='form-control form-select'
                  onChange={(e) =>
                    handleEditStatus({
                      orderId: order._id,
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
              ),
              createdAt: format_date(order.createdAt),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Orders;
