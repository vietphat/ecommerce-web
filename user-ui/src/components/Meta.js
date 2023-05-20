import { Helmet } from 'react-helmet';

import React from 'react';

const Meta = (props) => {
  const { title } = props;
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
    </Helmet>
  );
};

export default Meta;
