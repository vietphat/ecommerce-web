import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import { getAColor, editAColor } from '../features/color/colorSlice';

let colorSchema = Yup.object({
  title: Yup.string().required('Mã màu không được để trống'),
});

const EditColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Lấy thông tin màu
  useEffect(() => {
    dispatch(getAColor(id));
  }, [id, dispatch]);

  const { currentColor } = useSelector((state) => state.color);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentColor?.title ? currentColor?.title : '',
    },
    validationSchema: colorSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(editAColor({ _id: id, color: values }));

      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/colors-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>{`Sửa màu ${currentColor?.title}`}</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* MÃ MÀU */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Mã màu'
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
            Sửa mã màu
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditColor;
