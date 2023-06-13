import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

let couponSchema = Yup.object({
  name: Yup.string().required('Mã giảm giá không được để trống'),
  expiry: Yup.number()
    .min(1, 'Hạn sử dụng phải lớn hơn một')
    .required('Hạn sử dụng không được để trống'),
  discount: Yup.number()
    .min(1, 'Phần trăm phải lớn hơn 1 và nhỏ hơn hoặc bằng 100')
    .max(100, 'Phần trăm phải lớn hơn 1 và nhỏ hơn hoặc bằng 100')
    .required('Số phần trăm giảm không được để trống'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: couponSchema,
    // SUBMIT
    onSubmit: (values) => {
      dispatch(
        createCoupon({
          ...values,
          expiry: new Date(Date.now() + values.expiry * 24 * 60 * 60 * 1000),
        })
      );
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm mã giảm giá</h3>

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
              type='number'
              label='Hạn sử dụng (số ngày)'
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
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm mã giảm giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
