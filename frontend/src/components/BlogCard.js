import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return (
    <div className='blog-card'>
      <div className='card-image'>
        <img src='/images/blog-1.jpg' alt='blog' className='img-fluid w-100' />
      </div>
      <div className='blog-content'>
        <p className='date'>01/01/2023</p>
        <h5 className='title'>Some title</h5>
        <p className='desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis enim
          exercitationem quas.
        </p>
        <Link to='/' className='button '>
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
