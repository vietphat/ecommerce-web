import { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../features/customer/customerSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Họ',
    dataIndex: 'lastName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.lastName.length - b.lastName.length,
  },
  {
    title: 'Tên',
    dataIndex: 'firstName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.firstName.length - b.firstName.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customer);

  const { token } = user;
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách khách hàng</h3>
      <div>
        <Table
          columns={columns}
          dataSource={customers.map((customer, i) => {
            return { key: i + 1, ...customer };
          })}
        />
      </div>
    </div>
  );
};

export default Customers;
