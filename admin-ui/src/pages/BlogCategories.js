import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import { getBlogCategories } from '../features/blog-category/blogCategorySlice';

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
                  <Link to='/' className='fs-3'>
                    <BiEdit />
                  </Link>
                  <Link to='/' className='ms-3 fs-3 text-danger'>
                    <AiFillDelete />
                  </Link>
                </>
              ),
              ...blogCategory,
            };
          })}
        />
      </div>
    </div>
  );
};

export default BlogCategories;
