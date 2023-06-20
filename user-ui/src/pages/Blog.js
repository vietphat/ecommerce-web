import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { getBlogCategories, getBlogs } from '../features/blogs/blogSlice';

const Blog = () => {
  const [blogCategory, setBlogCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBlogs({ blogCategory }));
  }, [blogCategory, dispatch]);

  const { blogs, blogCategories } = useSelector((state) => state.blog);

  return (
    <>
      <Meta title='Techzone | Blogs' />
      <BreadCrumb title='Blogs' />
      <Container class1='blog-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Danh mục bài viết</h3>
              <div>
                <ul className='ps-0'>
                  {blogCategories.map((bc) => {
                    return (
                      <li
                        key={bc._id}
                        onClick={() => {
                          setBlogCategory((state) => {
                            if (state === bc._id) return '';
                            else return bc._id;
                          });
                        }}
                      >
                        <span
                          className={
                            bc._id === blogCategory &&
                            `fw-bold text-white bg-dark p-2 border`
                          }
                        >
                          {bc.title}
                        </span>
                      </li>
                    );
                  })}
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
