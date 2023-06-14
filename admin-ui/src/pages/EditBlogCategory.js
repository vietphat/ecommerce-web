import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import {
  getABlogCategory,
  editABlogCategory,
} from '../features/blog-category/blogCategorySlice';

let blogCategorySchema = Yup.object({
  title: Yup.string().required('Tên danh mục không được để trống'),
});

const EditBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin danh mục
  useEffect(() => {
    dispatch(getABlogCategory(id));
  }, [id, dispatch]);

  const { currentBlogCategory } = useSelector((state) => state.blogCategory);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentBlogCategory?.title ? currentBlogCategory?.title : '',
    },
    validationSchema: blogCategorySchema,
    // SUBMIT
    onSubmit: (values) => {
      dispatch(editABlogCategory({ _id: id, blogCategory: values }));
      formik.resetForm();
      navigate('/admin/blog-categories-list');
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa danh mục bài viết ${currentBlogCategory?.title}`}</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* TÊN DANH MỤC */}
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
            className='btn btn-success border-0 rounded-3 my-5'
          >
            Sửa danh mục bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogCategory;
