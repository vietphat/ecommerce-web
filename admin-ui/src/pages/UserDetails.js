import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import format_date from '../utils/format_date';
import ROLES from '../utils/role';
import { getUserById, editUserRole } from '../features/customer/customerSlice';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  const { currentUser } = useSelector((state) => state.customer);

  const goBack = () => {
    navigate(-1);
  };

  const handleEditUserRole = (data) => {
    dispatch(editUserRole(data));
  };

  return (
    <div>
      {currentUser ? (
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-4 title'>Chi tiết người dùng</h3>
            <button
              className='bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
              onClick={goBack}
            >
              <BiArrowBack className='fs-5' /> Go Back
            </button>
          </div>
          <div className='mt-4 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Họ:</h6>
              <p className='mb-0'>{currentUser.lastName}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Tên:</h6>
              <p className='mb-0'>{currentUser.firstName}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Số điện thoại:</h6>
              <p className='mb-0'>{currentUser.phoneNumber}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Email:</h6>
              <p className='mb-0'>{currentUser.email}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Ngày tạo tài khoản:</h6>
              <p className='mb-0'>{format_date(currentUser.createdAt)}</p>
            </div>

            <div className='d-flex align-items-center gap-3'>
              <h6 className='mb-0'>Quyền tài khoản:</h6>
              <div>
                <select
                  value={currentUser.role}
                  className='form-control form-select'
                  onChange={(e) =>
                    handleEditUserRole({
                      _id: currentUser._id,
                      role: e.target.value,
                    })
                  }
                >
                  <option value='user'>{ROLES['user']}</option>
                  <option value='admin'>{ROLES['admin']}</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        'Đang tải thông tin...'
      )}
    </div>
  );
};

export default UserDetails;
