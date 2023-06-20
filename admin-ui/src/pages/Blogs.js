import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getBlogs, deleteABlog } from '../features/blog/blogSlice';
import Modal from '../components/Modal';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    defaultSortOrder: 'descend',
    sorter: (a, b) => b.key - a.key,
  },
  {
    title: 'Tiêu đề',
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

const Blogs = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState();

  const showModal = (blogId) => {
    setOpen(true);
    setDeletedBlogId(blogId);
  };

  const handleOk = () => {
    dispatch(deleteABlog(deletedBlogId));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div>
      <h3 className='mt-4 title'>Danh sách bài viết</h3>
      <div>
        <Table
          columns={columns}
          dataSource={blogs.map((blog, i) => {
            return {
              key: i + 1,
              actions: (
                <>
                  <Link
                    to={`/admin/blog/${blog._id}`}
                    className='fs-3'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <BiEdit />
                  </Link>

                  <button
                    type='button'
                    className='ms-3 fs-3 text-danger bg-transparent border-0'
                    onClick={() => showModal(blog._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
              ...blog,
              createdAt: new Date(blog.createdAt)
                .toLocaleDateString('en-GB')
                .split('/')
                .join('/'),
            };
          })}
        />
      </div>

      <Modal
        title='Xác nhận xóa'
        content='Bạn có chắc chắn muốn xóa bài viết này không?'
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Blogs;
