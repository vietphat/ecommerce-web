import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const TermsAndConditions = () => {
  return (
    <>
      <Meta title='Các điều khoản và điều kiện' />
      <BreadCrumb title='Các điều khoản và điều kiện' />

      <section className='policy-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='policy'></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
