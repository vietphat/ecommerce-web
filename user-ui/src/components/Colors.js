import React from 'react';

const Colors = ({ colors, handleSetColor }) => {
  return (
    <>
      <ul className='colors ps-0'>
        {colors.map((c) => {
          return (
            <li
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
