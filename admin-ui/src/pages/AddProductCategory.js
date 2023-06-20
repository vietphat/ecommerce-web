import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createProductCategory } from '../features/product-category/productCategorySlice';

let productCategorySchema = Yup.object({
  title: Yup.string().required('Loại sản phẩm không được để trống'),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: productCategorySchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(createProductCategory(values));
      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/product-categories-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm loại sản phẩm</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* LOẠI SẢN PHẨM */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Loại sản phẩm'
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
            Thêm loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
