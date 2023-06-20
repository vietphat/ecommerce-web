import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createBrand } from '../features/brand/brandSlice';

let brandSchema = Yup.object({
  title: Yup.string().required('Tên thương hiệu không được để trống'),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: brandSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(createBrand(values));

      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/brands-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm thương hiệu</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* TÊN THƯƠNG HIỆU */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Thương hiệu'
              name='title'
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              value={formik.values.title}
            />
          </div>
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            Thêm thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
