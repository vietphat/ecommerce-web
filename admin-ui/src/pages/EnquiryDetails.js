import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { getAnEnquiry, editAnEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi';

const EnquiryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentEnquiry } = useSelector((state) => state.enquiry);

  useEffect(() => {
    dispatch(getAnEnquiry(id));
  }, [id, dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const handleEditStatus = (value, id) => {
    const enquiryData = { _id: id, enquiry: { status: value } };
    dispatch(editAnEnquiry(enquiryData));
  };

  return (
    <div>
      {currentEnquiry ? (
        <>
          {' '}
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-4 title'>Chi tiết thắc mắc khách hàng</h3>
            <button
              className='bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
              onClick={goBack}
            >
              <BiArrowBack className='fs-5' /> Go Back
            </button>
          </div>
          <div className='mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Họ tên:</h6>
              <p className='mb-0'>{currentEnquiry?.name}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Số điện thoại:</h6>
              <p className='mb-0'>{currentEnquiry?.mobile}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Email:</h6>
              <p className='mb-0'>{currentEnquiry?.email}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Comment:</h6>
              <p className='mb-0'>{currentEnquiry?.comment}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Trạng thái:</h6>
              <div>
                <select
                  name=''
                  defaultValue={currentEnquiry?.status}
                  className='form-control form-select'
                  id=''
                  onChange={(e) => handleEditStatus(e.target.value, id)}
                >
                  <option value='submitted'>Đã gửi</option>
                  <option value='contacted'>Đã liên hệ</option>
                  <option value='processing'>Đang xử lý</option>
                  <option value='resolved'>Đã xử lý</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default EnquiryDetails;
