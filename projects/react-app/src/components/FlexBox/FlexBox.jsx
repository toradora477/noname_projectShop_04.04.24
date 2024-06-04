import React from 'react';
import clsx from 'clsx';
import { Box } from '../';

const FlexBox = ({ children, className, mt, mb, style, alignItems = 'center' }) => (
  <Box
    className={clsx(className)}
    style={{
      display: 'flex',
      alignItems: alignItems,
      ...style,
    }}
    mt={mt}
    mb={mb}
    children={children}
  />
);

export default FlexBox;
