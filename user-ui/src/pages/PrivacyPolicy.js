import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title='Chính sách riêng tư' />
      <BreadCrumb title='Chính sách riêng tư' />

      <Container class1='policy-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <div className='policy'></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;