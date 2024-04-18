import React from 'react';
import clsx from 'clsx';
import './Box.scss';
const Box = ({ children, className, mt, style }) => (
  <div
    className={clsx('box-component', className)}
    style={{
      marginTop: mt ?? 8,
      ...style,
    }}
  >
    {children}
  </div>
);

export default Box;
