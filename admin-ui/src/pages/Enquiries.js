import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';

import {
  getEnquiries,
  deleteAnEnquiry,
  editAnEnquiry,
} from '../features/enquiry/enquirySlice';
import Modal from '../components/Modal';

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

  const [open, setOpen] = useState(false);
  const [deletedEnquiryId, setDeletedEnquiryId] = useState();

  const showModal = (enquiryId) => {
    setOpen(true);
    setDeletedEnquiryId(enquiryId);
  };

  const handleOk = () => {
    dispatch(deleteAnEnquiry(deletedEnquiryId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditStatus = (value, id) => {
    const enquiryData = { _id: id, enquiry: { status: value } };
    dispatch(editAnEnquiry(enquiryData));
  };

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
                  <Link
                    to={`/admin/enquiry-details/${enquiry._id}`}
                    className='ms-3 fs-3 text-primary'
                  >
                    <AiOutlineEye />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(enquiry._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              setStatus: (
                <>
                  <select
                    name=''
                    defaultValue={enquiry.status}
                    className='form-control form-select'
                    id=''
                    onChange={(e) =>
                      handleEditStatus(e.target.value, enquiry._id)
                    }
                  >
                    <option value='submitted'>Đã gửi</option>
                    <option value='contacted'>Đã liên hệ</option>
                    <option value='processing'>Đang xử lý</option>
                    <option value='resolved'>Đã xử lý</option>
                  </select>
                </>
              ),
              ...enquiry,
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa thắc mắc của khách hàng này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Enquiries;
