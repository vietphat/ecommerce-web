import React from 'react';

const Input = (props) => {
  const { type, label, i_id, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className='form-floating mt-3'>
      <input
        className={`form-control ${i_class}`}
        type={type}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  );
};

export default Input;
