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
    disabled,
  } = props;
  return (
    <div className={containerClassnames ? containerClassnames : ''}>
      <input
        disabled={disabled}
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
