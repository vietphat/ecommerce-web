import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { getABrand, editABrand } from '../features/brand/brandSlice';

let brandSchema = Yup.object({
  title: Yup.string().required('Tên thương hiệu không được để trống'),
});

const EditBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin thương hiệu
  useEffect(() => {
    dispatch(getABrand(id));
  }, [id, dispatch]);

  const { currentBrand } = useSelector((state) => state.brand);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentBrand?.title ? currentBrand?.title : '',
    },
    validationSchema: brandSchema,
    // SUBMIT
    onSubmit: (values) => {
      dispatch(editABrand({ _id: id, brand: values }));
      formik.resetForm();
      navigate('/admin/brands-list');
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa thương hiệu ${currentBrand?.title}`}</h3>

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
            Sửa thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;