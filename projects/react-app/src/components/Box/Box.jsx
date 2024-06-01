import React from 'react';
import clsx from 'clsx';

const Box = ({ children, className, mt, mb, style }) => (
  <div
    className={clsx(className)}
    style={{
      marginTop: mt ?? 0,
      marginBottom: mb ?? 0,
      ...style,
    }}
    children={children}
  />
);

export default Box;
