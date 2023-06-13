import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getCoupons } from '../features/coupon/couponSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Mã giảm giá',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Phần trăm chiết khấu',
    dataIndex: 'discount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expiry',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.expiry - b.expiry,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Coupons = () => {
  const dispatch = useDispatch();

  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách mã giảm giá</h3>
      <div>
        <Table
          columns={columns}
          dataSource={coupons.map((coupon, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link to='/' className='fs-3'>
                    <BiEdit />
                  </Link>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              ...coupon,
              expiry: new Date(coupon.expiry).toLocaleString('en-GB'),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Coupons;
