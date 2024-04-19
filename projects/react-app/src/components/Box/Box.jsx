import React from 'react';
import clsx from 'clsx';

const Box = ({ children, className, mt, style }) => (
  <div
    className={clsx(className)}
    style={{
      marginTop: mt ?? 8,
      ...style,
    }}
    children={children}
  />
);

export default Box;
