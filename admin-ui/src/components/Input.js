import React from 'react';

const Input = (props) => {
  const { type, label, i_id, i_class } = props;
  return (
    <div className='form-floating mb-3'>
      <input
        className={`form-control ${i_class}`}
        type={type}
        id={i_id}
        placeholder={label}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  );
};

export default Input;
