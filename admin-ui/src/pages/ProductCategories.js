import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getProductCategories } from '../features/product-category/productCategorySlice';

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
                  <Link to='/' className='fs-3'>
                    <BiEdit />
                  </Link>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              ...productCategory,
            };
          })}
        />
      </div>
    </div>
  );
};

export default ProductCategories;
