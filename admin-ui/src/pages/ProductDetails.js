import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { BiArrowBack } from 'react-icons/bi';
import { getProductById } from '../features/product/productSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const { currentProduct } = useSelector((state) => state.product);

  const goBack = () => {
    navigate(-1);
  };

  // const handleEditRole = (value, id) => {
  //   const enquiryData = { _id: id, enquiry: { status: value } };
  //   dispatch(editAnEnquiry(enquiryData));
  // };

  console.log(currentProduct);

  return (
    <div>
      {currentProduct ? (
        <div className='p-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-3 title'>{`Chi tiết sản phẩm ${
              currentProduct ? currentProduct.title : ''
            }`}</h3>
            <button
              className='bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
              onClick={goBack}
            >
              <BiArrowBack className='fs-5' /> Go Back
            </button>
          </div>
          <div className='mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Mã sản phẩm:</h6>
              <p className='mb-0'>{currentProduct?._id}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Tên sản phẩm:</h6>
              <p className='mb-0'>{currentProduct?.title}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Slug:</h6>
              <p className='mb-0'>{currentProduct?.slug}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Giá:</h6>
              <p className='mb-0'>{currentProduct?.price}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Số lượng:</h6>
              <p className='mb-0'>{currentProduct?.quantity}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Mô tả:</h6>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProduct?.description,
                }}
              ></div>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Thương hiệu:</h6>
              <p className='mb-0'>{currentProduct?.brand?.title}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Loại sản phẩm:</h6>
              <p className='mb-0'>{currentProduct?.category.title}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Tag:</h6>
              <p className='mb-0'>{currentProduct?.tag}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Tên sản phẩm:</h6>
              <p className='mb-0'>{currentProduct?.title}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Màu sản phẩm:</h6>
              <p className='mb-0'>
                {currentProduct?.colors?.map((c) => {
                  return (
                    <span
                      style={{
                        backgroundColor: c.title,
                        height: 25,
                        width: 25,
                        borderRadius: 50,
                        display: 'inline-block',
                        marginRight: 10,
                      }}
                    />
                  );
                })}
              </p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Đánh giá trung bình:</h6>
              <p className='mb-0'>{currentProduct?.ratingsAverage} sao</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Số lượt đánh giá:</h6>
              <p className='mb-0'>{currentProduct?.ratingsQuantity} lượt</p>
            </div>

            <div className='showimages d-flex flex-wrap align-items-center gap-3'>
              {currentProduct.images.map((img) => {
                return (
                  <div className='position-relative' key={img.public_id}>
                    <button
                      className='btn-close position-absolute'
                      style={{ top: '10px', right: '10px' }}
                      type='button'
                    />
                    <img
                      className='img-fluid'
                      src={img.url}
                      alt='product'
                      width={300}
                      height={300}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        'Đang tải...'
      )}
    </div>
  );
};

export default ProductDetails;
