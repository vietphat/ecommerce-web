import React from 'react';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const Contact = () => {
  return (
    <>
      <Meta title='Liên hệ' />
      <BreadCrumb title='Liên hệ' />

      <Container class1='contact-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <iframe
              className='border-0 w-100'
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10796.732132514438!2d105.76026030808599!3d10.010711065178993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1684226882586!5m2!1svi!2s'
              width='600'
              height='450'
              allowFullScreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
              title='map'
            ></iframe>
          </div>

          <div className='col-12 mt-5'>
            <div className='contact-inner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title mb-4'>Liên hệ</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Tên'
                    />
                  </div>
                  <div>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                    />
                  </div>
                  <div>
                    <input
                      type='tel'
                      className='form-control'
                      placeholder='Số điện thoại'
                    />
                  </div>
                  <div>
                    <textarea
                      className='w-100 form-control'
                      cols={30}
                      rows={5}
                      placeholder='Nội dung'
                    ></textarea>
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
