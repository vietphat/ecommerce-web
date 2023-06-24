import React from 'react';

const Colors = ({ colors, handleSetColor, class1 }) => {
  return (
    <>
      <ul className={`colors ps-0 ${class1}`}>
        {colors.map((c) => {
          return (
            <li
              className='border border-dark'
              key={c._id}
              style={{ backgroundColor: c.title }}
              onClick={() => handleSetColor(c._id)}
            ></li>
          );
        })}
      </ul>
    </>
  );
};

export default Colors;
