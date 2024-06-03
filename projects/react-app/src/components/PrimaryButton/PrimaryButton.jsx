import React from 'react';
import clsx from 'clsx';
import './PrimaryButton.scss';

const PrimaryButton = ({ disabled, onClick, className, children, mt, ml, mb, style, color, type = 'button' }) => {
  return (
    <button
      type={type}
      className={clsx('primary-main-btn', className, color, { disabled })}
      style={{
        marginTop: mt ?? 0,
        marginBottom: mb ?? 0,
        marginLeft: ml ?? 0,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
