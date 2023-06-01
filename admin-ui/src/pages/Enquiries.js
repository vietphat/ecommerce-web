import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getEnquiries } from '../features/enquiry/enquirySlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Người gửi',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'mobile',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.mobile.length - b.mobile.length,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'setStatus',
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  const { enquiries } = useSelector((state) => state.enquiry);

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Phản hồi của khách hàng</h3>
      <div>
        <Table
          columns={columns}
          dataSource={enquiries.map((enquiry, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              setStatus: (
                <>
                  <select name='' className='form-control form-select' id=''>
                    <option value=''>Thay đổi trạng thái</option>
                  </select>
                </>
              ),
              ...enquiry,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Enquiries;
