import React from 'react';
import clsx from 'clsx';
import './Typography.scss';

const Typography = ({ children, className, mt, mb, ml, mr, fs, fw, style, color }) => {
  return (
    <div
      className={clsx('typography-component', className, color)}
      style={{
        marginTop: mt ?? 0,
        marginBottom: mb ?? 0,
        marginLeft: ml ?? 0,
        marginRight: mr ?? 0,
        fontSize: fs ?? 14,
        fontWeight: fw ?? 400,
        ...style,
      }}
      children={children}
    />
  );
};

export default Typography;
