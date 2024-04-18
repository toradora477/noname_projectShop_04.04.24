import React from 'react';
import clsx from 'clsx';
import { Box } from '../';

const FlexBox = ({ children, className, mt, style }) => (
  <Box
    className={clsx(className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      ...style,
    }}
    mt={mt}
    children={children}
  />
);

export default FlexBox;
