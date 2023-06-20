import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createCoupon } from '../features/coupon/couponSlice';
import { useNavigate } from 'react-router-dom';

let couponSchema = Yup.object({
  name: Yup.string().required('Mã giảm giá không được để trống'),
  expiry: Yup.date().required('Hạn sử dụng không được để trống'),
  discount: Yup.number()
    .min(1, 'Phần trăm phải lớn hơn 1 và nhỏ hơn hoặc bằng 100')
    .max(100, 'Phần trăm phải lớn hơn 1 và nhỏ hơn hoặc bằng 100')
    .required('Số phần trăm giảm không được để trống'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: couponSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(createCoupon(values));
      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/coupons-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm phiếu giảm giá</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* MÃ GIẢM GIÁ */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Mã giảm giá'
              name='name'
              onChange={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
            />
          </div>
          <div className='error'>
            {formik.touched.name && formik.errors.name}
          </div>

          {/* PHẦN TRĂM GIẢM */}
          <div className='mt-4'>
            <Input
              type='number'
              min={1}
              max={100}
              label='Phần trăm chiết khấu (1 - 100)'
              name='discount'
              onChange={formik.handleChange('discount')}
              onBlur={formik.handleBlur('discount')}
              value={formik.values.discount}
            />
          </div>
          <div className='error'>
            {formik.touched.discount && formik.errors.discount}
          </div>

          {/* HẠN SỬ DỤNG */}
          <div className='mt-4'>
            <Input
              type='date'
              label='Hạn sử dụng'
              min={1}
              name='expiry'
              onChange={formik.handleChange('expiry')}
              onBlur={formik.handleBlur('expiry')}
              value={formik.values.expiry}
            />
          </div>
          <div className='error'>
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            Thêm mã giảm giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
