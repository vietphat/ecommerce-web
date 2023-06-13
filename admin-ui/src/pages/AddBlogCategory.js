import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createBlogCategory } from '../features/blog-category/blogCategorySlice';

let blogCategorySchema = Yup.object({
  title: Yup.string().required('Danh mục bài vết không được để trống'),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: blogCategorySchema,
    // SUBMIT
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/blog-categories-list');
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm danh mục bài viết</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* LOẠI BÀI BIẾT */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Danh mục bài viết'
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
            Thêm danh mục bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
