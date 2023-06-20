import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import format_date from '../utils/format_date';
import { getBrands, deleteABrand } from '../features/brand/brandSlice';
import Modal from '../components/Modal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Tên thương hiệu',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
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

const Brands = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedBrandId, setDeletedBrandId] = useState();

  const showModal = (brandId) => {
    setOpen(true);
    setDeletedBrandId(brandId);
  };

  const handleOk = () => {
    dispatch(deleteABrand(deletedBrandId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách thương hiệu</h3>
      <div>
        <Table
          columns={columns}
          dataSource={brands.map((brand, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link
                    to={`/admin/brand/${brand._id}`}
                    className='fs-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(brand._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...brand,
              createdAt: format_date(brand.createdAt),
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa thương hiệu này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Brands;
