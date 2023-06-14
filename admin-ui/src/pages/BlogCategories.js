import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import {
  getBlogCategories,
  deleteABlogCategory,
} from '../features/blog-category/blogCategorySlice';
import Modal from '../components/Modal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Danh mục bài viết',
    dataIndex: 'title',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
  },
];

const BlogCategories = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedBlogCategoryId, setDeletedBlogCategoryId] = useState();

  const showModal = (blogCategoryId) => {
    setOpen(true);
    setDeletedBlogCategoryId(blogCategoryId);
  };

  const handleOk = () => {
    dispatch(deleteABlogCategory(deletedBlogCategoryId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { blogCategories } = useSelector((state) => state.blogCategory);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh mục bài viết</h3>
      <div>
        <Table
          columns={columns}
          dataSource={blogCategories.map((blogCategory, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link
                    to={`/admin/blog-category/${blogCategory._id}`}
                    className='fs-3'
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(blogCategory._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...blogCategory,
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa danh mục bài viết này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default BlogCategories;
