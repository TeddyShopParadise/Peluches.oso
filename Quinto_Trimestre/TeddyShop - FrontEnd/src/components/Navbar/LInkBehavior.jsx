import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { button, ...restProps } = props;
  return <RouterLink ref={ref} {...restProps} />;
});

export default LinkBehavior;
