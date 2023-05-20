import React from 'react';

const Input = (props) => {
  const { type, name, placeholder, classNames } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classNames ? classNames : ''}`}
      />
    </div>
  );
};

export default Input;
