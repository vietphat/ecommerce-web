import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getCoupons, deleteACoupon } from '../features/coupon/couponSlice';
import Modal from '../components/Modal';
import formatDate from '../utils/format_date';

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
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expiry',
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Coupons = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedCouponId, setDeletedCouponId] = useState();

  const showModal = (couponId) => {
    setOpen(true);
    setDeletedCouponId(couponId);
  };

  const handleOk = () => {
    dispatch(deleteACoupon(deletedCouponId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách phiếu giảm giá</h3>
      <div>
        <Table
          columns={columns}
          dataSource={coupons.map((coupon, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link
                    to={`/admin/coupon/${coupon._id}`}
                    className='fs-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(coupon._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...coupon,
              createdAt: formatDate(coupon.createdAt),
              expiry: new Date(coupon.expiry).toLocaleString('en-GB'),
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa phiếu giảm giá này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Coupons;
