import React from 'react';
import clsx from 'clsx';
import './Text.scss';

const Text = ({ children, className, mt, fz, fw, style }) => {
  return (
    <div
      className={clsx('text-component', className)}
      style={{
        marginTop: mt ?? 8,
        fontSize: fz ?? 16,
        fontWeight: fw ?? 400,
        ...style,
      }}
      children={children}
    />
  );
};

export default Text;
