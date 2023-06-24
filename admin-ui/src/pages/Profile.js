import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';

import Input from '../components/Input';
import { updateMyData } from '../features/auth/authSlice';
import axios from 'axios';
import { config } from '../utils/axios_config';

const profileSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđÀÁẠÃẢÂẦẤẬẪẨĂẰẮẶẴẲÈÉẸẼẺÊỀẾỆỄỂÌÍỊĨỈÒÓỌÕỎÔỒỐỘỖỔƠỜỚỢỠỞÙÚỤŨỦƯỪỨỰỮỬỲÝỴỸỶĐ]+$/,
      'Tên không hợp lệ'
    )
    .required('Tên không được để trống'),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđÀÁẠÃẢÂẦẤẬẪẨĂẰẮẶẴẲÈÉẸẼẺÊỀẾỆỄỂÌÍỊĨỈÒÓỌÕỎÔỒỐỘỖỔƠỜỚỢỠỞÙÚỤŨỦƯỪỨỰỮỬỲÝỴỸỶĐ]+$/,
      'Họ không hợp lệ'
    )
    .required('Họ không được để trống'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ')
    .test('unique-phone-number', 'Số điện thoại đã tồn tại', async (value) => {
      // Gửi request kiểm tra số điện thoại không trùng
      const response = await axios(
        `http://localhost:5000/api/auth/check-phone-number-when-update/${value}`,
        config()
      );

      const isExisted = await response.data.data.isExisted;

      return !isExisted;
    })
    .required('Số điện thoại không được để trống'),
  email: Yup.string().required('Email không được để trống'),
});

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      };

      dispatch(updateMyData(data));

      setEditMode(false);
    },
  });

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='d-flex justify-content-between alin-items-center'>
          <h3 className='my-2'>Thông tin cá nhân</h3>
          <FiEdit
            onClick={() => setEditMode((state) => !state)}
            className='fs-3'
            cursor='pointer'
          />
        </div>
        <div className='col-12'>
          <form
            onSubmit={formik.handleSubmit}
            className='d-flex flex-column gap-2'
          >
            <Input
              disabled={true}
              classNames='p-2'
              type='email'
              name='email'
              placeholder='Email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            <div className='error'>
              {formik.touched.email && formik.errors.email}
            </div>

            <Input
              disabled={!editMode}
              classNames='p-2'
              type='text'
              name='lastName'
              placeholder='Họ'
              label='Họ'
              value={formik.values.lastName}
              onChange={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
            <div className='error'>
              {formik.touched.lastName && formik.errors.lastName}
            </div>

            <Input
              disabled={!editMode}
              classNames='p-2'
              type='text'
              name='firstName'
              placeholder='Tên'
              label='Tên'
              value={formik.values.firstName}
              onChange={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
            />
            <div className='error'>
              {formik.touched.firstName && formik.errors.firstName}
            </div>

            <Input
              disabled={!editMode}
              classNames='p-2'
              type='text'
              name='phoneNumber'
              label='Số điện thoại'
              placeholder='Số điện thoại'
              value={formik.values.phoneNumber}
              onChange={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
            />
            <div className='error'>
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </div>

            <div className='mt-3 '>
              <button
                disabled={!editMode || !formik.isValid}
                className='btn btn-success border-0'
                type='submit'
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
