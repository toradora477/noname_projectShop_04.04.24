import React from 'react';
import clsx from 'clsx';

const FlexBox = ({ children, className, mt, style }) => (
  <div
    className={clsx(className)}
    style={{
      marginTop: mt ?? 8,
      display: 'flex',
      alignItems: 'center',
      ...style,
    }}
    children={children}
  />
);

export default FlexBox;
