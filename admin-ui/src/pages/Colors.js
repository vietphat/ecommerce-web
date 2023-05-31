import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getColors } from '../features/color/colorSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Màu',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const Colors = () => {
  const dispatch = useDispatch();

  const { colors } = useSelector((state) => state.color);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Màu sản phẩm</h3>
      <div>
        <Table
          columns={columns}
          dataSource={colors.map((color, i) => {
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
              ...color,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Colors;
