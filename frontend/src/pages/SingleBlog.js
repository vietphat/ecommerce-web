import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import blog from '../images/blog-1.jpg';

const SingleBlog = () => {
  return (
    <>
      <Meta title='Dynamic blog name' />
      <BreadCrumb title='Dynamic blog name' />

      <div className='blog-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='single-blog-card'>
                <Link to='/blog' className='d-flex align-items-center gap-10'>
                  <HiOutlineArrowLeft className='fs-4' />
                  Trở lại
                </Link>
                <h3 className='title'>
                  Lorem ipsum dolor sit, amet consectetur
                </h3>
                <img src={blog} alt='blog' className='img-fluid w-100 my-4' />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus iste accusamus alias facere recusandae consequatur
                  tempore, enim ipsum inventore modi laboriosam, nemo architecto
                  accusantium nulla minima dolorum illum laborum hic!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
