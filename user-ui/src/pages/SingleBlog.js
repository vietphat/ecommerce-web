import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { getABlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getABlog(id));
  }, [id, dispatch]);

  const { currentBlog } = useSelector((state) => state.blog);

  return (
    <>
      {!currentBlog ? (
        <div className='text-center fs-5'>Loading...</div>
      ) : (
        <>
          <Meta title={`Techzone | ${currentBlog?.title}`} />
          <BreadCrumb title={currentBlog?.title} />

          <Container class1='blog-wrapper home-wrapper-2 py-5'>
            <div className='row'>
              <div className='col-12'>
                <div className='single-blog-card'>
                  <Link
                    to='/blog'
                    className='d-flex align-items-center gap-10'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <HiOutlineArrowLeft className='fs-4' />
                    Trở lại
                  </Link>
                  <h3 className='title'>{currentBlog?.title}</h3>
                  <img
                    src={currentBlog?.images[0]?.url}
                    alt='blog'
                    className='img-fluid w-100 my-4'
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: currentBlog?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleBlog;
