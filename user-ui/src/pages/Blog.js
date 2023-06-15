import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { getBlogs } from '../features/blogs/blogSlice';

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const { blogs } = useSelector((state) => state.blog);

  return (
    <>
      <Meta title='Blogs' />
      <BreadCrumb title='Blogs' />
      <Container class1='blog-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Loại bài viết</h3>
              <div>
                <ul className='ps-0'>
                  <li>Đồng hồ</li>
                  <li>TV</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='col-9'>
            <div className='row'>
              {blogs?.length === 0 ? (
                <div className='text-center fs-5'>Chưa có bài viết nào</div>
              ) : (
                blogs?.map((blog) => {
                  return (
                    <div key={blog._id} className='col-6 mb-3'>
                      <BlogCard blog={blog} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
