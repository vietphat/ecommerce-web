import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import {
  getAProductCategory,
  editAProductCategory,
} from '../features/product-category/productCategorySlice';

let productCategorySchema = Yup.object({
  title: Yup.string().required('Loại sản phẩm không được để trống'),
});

const EditProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin loại sản phẩm
  useEffect(() => {
    dispatch(getAProductCategory(id));
  }, [id, dispatch]);

  const { currentProductCategory } = useSelector(
    (state) => state.productCategory
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentProductCategory?.title ? currentProductCategory?.title : '',
    },
    validationSchema: productCategorySchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(
        editAProductCategory({ _id: id, productCategory: values })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/product-categories-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa loại sản phẩm ${currentProductCategory?.title}`}</h3>

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
            Sửa loại sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductCategory;
