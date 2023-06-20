import { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import format_date from '../utils/format_date';
import {
  deleteAnUser,
  editUserRole,
  getUsers,
} from '../features/customer/customerSlice';
import ROLES from '../utils/role';
import Modal from '../components/Modal';

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
  {
    title: 'Quyền',
    dataIndex: 'role',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState();
  const dispatch = useDispatch();

  const showModal = (userId) => {
    setOpen(true);
    setDeletedUserId(userId);
  };

  const handleOk = () => {
    dispatch(deleteAnUser(deletedUserId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditUserRole = (role, id) => {
    const data = { _id: id, role };
    dispatch(editUserRole(data));
  };

  const { user } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.customer);

  const { token } = user;
  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách người dùng</h3>
      <div>
        <Table
          columns={columns}
          dataSource={customers.map((customer, i) => {
            return {
              key: i + 1,
              ...customer,
              role:
                customer.email === user.email ? (
                  ROLES[customer.role]
                ) : (
                  <>
                    <select
                      value={customer.role}
                      className='form-control form-select'
                      onChange={(e) =>
                        handleEditUserRole(e.target.value, customer._id)
                      }
                    >
                      <option value='user'>{ROLES['user']}</option>
                      <option value='admin'>{ROLES['admin']}</option>
                    </select>
                  </>
                ),
              createdAt: format_date(customer.createdAt),
              actions: (
                <>
                  <Link
                    to={`/admin/user-details/${customer._id}`}
                    className='ms-3 fs-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <AiOutlineEye />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0 m-0 p-0'
                    onClick={() => {
                      if (customer.email === user.email) return;
                      showModal(customer._id);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa người dùng này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Customers;
