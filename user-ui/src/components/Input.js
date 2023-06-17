import React from 'react';

const Input = (props) => {
  const {
    type,
    name,
    placeholder,
    classNames,
    onChange,
    onBlur,
    value,
    containerClassnames,
  } = props;
  return (
    <div className={containerClassnames ? containerClassnames : ''}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classNames ? classNames : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
