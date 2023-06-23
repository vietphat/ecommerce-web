import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../components/Input';
import { createColor } from '../features/color/colorSlice';

let colorSchema = Yup.object({
  title: Yup.string().required('Màu không được để trống'),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: colorSchema,
    // SUBMIT
    onSubmit: async (values) => {
      const result = await dispatch(createColor(values));
      if (result.meta.requestStatus === 'fulfilled') {
        formik.resetForm();
        navigate('/admin/colors-list');
      }
    },
  });

  return (
    <div>
      <h3 className='mb-4 title'>Thêm màu sản phẩm</h3>

      <div>
        <form action='' onSubmit={formik.handleSubmit}>
          {/* MÀU SẢN PHẨM */}
          <div className='mt-4'>
            <Input
              type='text'
              label='Màu sản phẩm'
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
            Thêm màu sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
