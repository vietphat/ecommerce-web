import { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

import { getOrders } from '../features/order/orderSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Người đặt',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'productNames',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.productNames.length - b.productNames.length,
  },
  {
    title: 'Thành tiền',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount.length - b.amount.length,
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.createdAt.length - b.createdAt.length,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  const { token } = user;
  useEffect(() => {
    dispatch(getOrders(token));
  }, [token, dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách đơn đặt hàng</h3>
      <div>
        <Table
          columns={columns}
          dataSource={orders.map((order, i) => {
            return {
              key: i + 1,
              name: order.orderBy.firstName,
              productNames: order.products.map((p) => (
                <li key={p.product._id}>{p.product.title}</li>
              )),
              amount: order.paymentIntent.amount,
              createdAt: order.createdAt,
              actions: (
                <>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              ...order,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Orders;
