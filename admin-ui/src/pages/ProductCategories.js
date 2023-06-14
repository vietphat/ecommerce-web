import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import {
  deleteAProductCategory,
  getProductCategories,
} from '../features/product-category/productCategorySlice';
import Modal from '../components/Modal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const ProductCategories = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedProductCategoryId, setDeletedProductCategoryId] = useState();

  const showModal = (productCategoryId) => {
    setOpen(true);
    setDeletedProductCategoryId(productCategoryId);
  };

  const handleOk = () => {
    dispatch(deleteAProductCategory(deletedProductCategoryId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { productCategories } = useSelector((state) => state.productCategory);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách loại sản phẩm</h3>
      <div>
        <Table
          columns={columns}
          dataSource={productCategories.map((productCategory, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link
                    to={`/admin/product-category/${productCategory._id}`}
                    className='fs-3'
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(productCategory._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...productCategory,
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa loại sản phẩm này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ProductCategories;
