import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi';

import { addEnquiry } from '../features/auth/authSlice';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Input from '../components/Input';

const enquirySchema = Yup.object({
  name: Yup.string().required('Họ tên không được để trống'),
  email: Yup.string().required('Email không được để trống'),
  mobile: Yup.string().required('Số điện thoại không được để trống'),
  comment: Yup.string().required('Nội dung không được để trống'),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: enquirySchema,
    onSubmit: (values) => {
      dispatch(addEnquiry(values));
      formik.resetForm();
      // navigate('/');
    },
  });

  return (
    <>
      <Meta title='Techzone | Liên hệ' />
      <BreadCrumb title='Liên hệ' />

      <Container class1='contact-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          {/* MAP */}
          <div className='col-12'>
            <iframe
              className='border-0 w-100'
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10796.732132514438!2d105.76026030808599!3d10.010711065178993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1684226882586!5m2!1svi!2s'
              width='600'
              height='450'
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='map'
            ></iframe>
          </div>

          {/* FORM */}
          <div className='col-12 mt-5'>
            <div className='contact-inner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title mb-4'>Liên hệ</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className='d-flex flex-column gap-15'
                >
                  <Input
                    type='text'
                    name='name'
                    placeholder='Họ và tên'
                    value={formik.values.name}
                    onChange={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                  />
                  <div className='error'>
                    {formik.touched.name && formik.errors.name}
                  </div>

                  <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                  />
                  <div className='error'>
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <Input
                    type='text'
                    name='mobile'
                    placeholder='Số điện thoại'
                    value={formik.values.mobile}
                    onChange={formik.handleChange('mobile')}
                    onBlur={formik.handleBlur('mobile')}
                  />
                  <div className='error'>
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>

                  <div>
                    <textarea
                      className='w-100 form-control'
                      cols={30}
                      rows={5}
                      name='comment'
                      placeholder='Nội dung'
                      value={formik.values.comment}
                      onChange={formik.handleChange('comment')}
                      onBlur={formik.handleBlur('comment')}
                    ></textarea>
                  </div>
                  <div className='error'>
                    {formik.touched.comment && formik.errors.comment}
                  </div>

                  <div>
                    <button className='button border-0'>Gửi</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className='contact-title mb-4'>Địa chỉ</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <AiOutlineHome className='fs-5' />
                      <address className='mb-0'>
                        30/4 Hưng Lợi, Xuân Khánh, Ninh Kiều, tp.Cần Thơ
                      </address>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <BiPhoneCall className='fs-5' />
                      <a href='tel:0947773536'>094 777 3536</a>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <AiOutlineMail className='fs-5' />
                      <a href='mailto:vietphatt1909@gmail.com'>
                        vietphatt1909@gmail.com
                      </a>
                    </li>
                    <li className='mb-3 d-flex align-items-center gap-15'>
                      <BiInfoCircle className='fs-5' />
                      <p className='mb-0'>
                        Mở cửa từ 8h sáng đến 10h tối hàng ngày
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
