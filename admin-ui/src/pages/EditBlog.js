import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { getABlog, editABlog } from '../features/blog/blogSlice';
import { getBlogCategories } from '../features/blog-category/blogCategorySlice';

let blogSchema = Yup.object({
  title: Yup.string().required('Tiêu đề bài viết không được để trống'),
  description: Yup.string().required('Nội dung không được để trống'),
  category: Yup.string().required('Danh mục bài viết không được để trống'),
});

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin blog
  useEffect(() => {
    dispatch(getABlog(id));
    dispatch(getBlogCategories());
  }, [id, dispatch]);

  const { blogCategories } = useSelector((state) => state.blogCategory);
  const { currentBlog } = useSelector((state) => state.blog);

  const formik = useFormik({
    enableReinitialize: true,
    isInitialValid: false,
    initialValues: {
      title: currentBlog?.title ? currentBlog?.title : '',
      description: currentBlog?.description ? currentBlog?.description : '',
      category: currentBlog?.category ? currentBlog?.category : '',
      images: currentBlog?.images,
    },
    validationSchema: blogSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(editABlog({ _id: id, blog: values }));

      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/blogs-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa bài viết ${currentBlog?.title}`}</h3>

      <div>
        <form
          action=''
          onSubmit={formik.handleSubmit}
          className='d-flex gap-3 flex-column'
        >
          {/* TIÊU ĐỀ */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Tiêu đề'
              name='title'
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              value={formik.values.title}
            />
          </div>
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          {/* DANH MỤC BÀI VIẾT */}
          <select
            className='form-control form-select py-3'
            name='category'
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
          >
            <option value=''>Chọn danh mục bài viết</option>
            {blogCategories.map((bc) => {
              return (
                <option key={bc._id} value={bc._id}>
                  {bc.title}
                </option>
              );
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category}
          </div>

          {/* NỘI DUNG BÀI VIẾT */}
          <div>
            <ReactQuill
              theme='snow'
              name='description'
              onChange={formik.handleChange('description')}
              value={formik.values.description}
            />
          </div>
          <div className='error'>{formik.errors.description}</div>

          <button
            type='submit'
            disabled={!formik.isValid}
            className='btn btn-success border-0 rounded-3 my-5'
          >
            Sửa bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
