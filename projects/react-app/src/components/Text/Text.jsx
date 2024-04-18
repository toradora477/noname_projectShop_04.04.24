import React from 'react';
import clsx from 'clsx';
import './Text.scss';

const Text = ({ children, className, mt, mb, fs, fw, style }) => {
  return (
    <div
      className={clsx('text-component', className)}
      style={{
        marginTop: mt ?? 0,
        marginBottom: mb ?? 0,
        fontSize: fs ?? 14,
        fontWeight: fw ?? 400,
        ...style,
      }}
      children={children}
    />
  );
};

export default Text;
