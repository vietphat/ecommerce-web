import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getBrands } from '../features/brand/brandSlice';

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
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Brands = () => {
  const dispatch = useDispatch();

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
                  <Link to='/' className='fs-3'>
                    <BiEdit />
                  </Link>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              ...brand,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Brands;
