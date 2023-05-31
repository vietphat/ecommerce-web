import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getProducts } from '../features/product/productSlice';

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
    title: 'Giá',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
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
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Products = () => {
  const dispatch = useDispatch();

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
              ...product,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Products;
