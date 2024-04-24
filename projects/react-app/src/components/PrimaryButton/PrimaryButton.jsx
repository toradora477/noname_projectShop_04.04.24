import React from 'react';
import clsx from 'clsx';
import './PrimaryButton.scss';

const PrimaryButton = ({ onClick, className, children, mt, style, color }) => {
  return (
    <button
      className={clsx('primary-main-btn', className, color)}
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

export default PrimaryButton;
