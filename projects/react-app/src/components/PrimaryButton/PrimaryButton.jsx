import React from 'react';
import clsx from 'clsx';
import './PrimaryButton.scss';

const PrimaryButton = ({ onClick, className, children, mt, ml, style, color, type = 'button' }) => {
  return (
    <button
      type={type}
      className={clsx('primary-main-btn', className, color)}
      style={{
        marginTop: mt ?? 0,
        marginLeft: ml ?? 0,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
