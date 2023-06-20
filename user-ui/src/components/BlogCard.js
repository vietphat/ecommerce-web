import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog?._id}`}
      className='blog-card'
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className='card-image'>
        <img
          src={blog?.images[0]?.url}
          alt='blog'
          className='img-fluid w-100'
        />
      </div>
      <div className='blog-content'>
        <p className='date'>{moment(blog?.createdAt).format('DD/MM/YYYY')}</p>
        <h5 className='title'>{blog?.title}</h5>
        <p
          className='desc'
          dangerouslySetInnerHTML={{
            __html: blog?.description.substr(0, 150) + '...',
          }}
        ></p>
        <button to={`/blog/${blog?._id}`} className='button border-0'>
          Đọc thêm
        </button>
      </div>
    </Link>
  );
};

export default BlogCard;
