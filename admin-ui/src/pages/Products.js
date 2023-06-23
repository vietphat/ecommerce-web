import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';

import { getProducts, deleteAProduct } from '../features/product/productSlice';
import format_currency from '../utils/format_currency';
import format_date from '../utils/format_date';
import Modal from '../components/Modal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'category',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Thương hiệu',
    dataIndex: 'brand',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Products = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState();

  const showModal = (productId) => {
    setOpen(true);
    setDeletedProductId(productId);
  };

  const handleOk = () => {
    dispatch(deleteAProduct(deletedProductId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách sản phẩm</h3>
      <div>
        <Table
          columns={columns}
          dataSource={products.map((product, i) => {
            return {
              key: i + 1,
              title: product.title.substr(0, 30) + '...',
              price: format_currency(product.price),
              category: product.category.title,
              brand: product.brand.title,
              quantity: product.quantity,
              createdAt: format_date(product.createdAt),
              actions: (
                <>
                  <Link
                    to={`/admin/product-details/${product._id}`}
                    className='ms-3 fs-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <AiOutlineEye />
                  </Link>

                  <Link
                    to={`/admin/product/${product._id}`}
                    className='fs-3 ms-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0 m-0 p-0'
                    onClick={() => showModal(product._id)}
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
        content='Bạn có chắc chắn muốn xóa sản phẩm này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Products;
