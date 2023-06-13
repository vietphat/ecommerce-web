import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import {
  createProductCategory,
  resetState,
} from '../features/product-category/productCategorySlice';

let productCategorySchema = Yup.object({
  title: Yup.string().required('Loại sản phẩm không được để trống'),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: productCategorySchema,
    // SUBMIT
    onSubmit: (values) => {
      dispatch(createProductCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
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
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
