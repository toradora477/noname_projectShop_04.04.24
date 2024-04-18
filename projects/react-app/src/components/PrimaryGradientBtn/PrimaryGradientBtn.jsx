import React from 'react';
import clsx from 'clsx';
import './PrimaryGradientBtn.scss';

const PrimaryGradientBtn = ({ onClick, className, children, mt, style }) => {
  return (
    <button
      className={clsx('primary-gradient-main-btn', className)}
      style={{
        marginTop: mt ?? 0,
        ...style,
      }}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryGradientBtn;
