import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getColors, deleteAColor } from '../features/color/colorSlice';
import Modal from '../components/Modal';

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

  const [open, setOpen] = useState(false);
  const [deletedColorId, setDeletedColorId] = useState();

  const showModal = (colorId) => {
    setOpen(true);
    setDeletedColorId(colorId);
  };

  const handleOk = () => {
    dispatch(deleteAColor(deletedColorId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
                  <Link to={`/admin/color/${color._id}`} className='fs-3'>
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(color._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...color,
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa màu này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Colors;
