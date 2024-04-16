import React from 'react';
import './PrimaryGradientBtn.scss';

const PrimaryGradientBtn = ({ onClick, children }) => {
  return (
    <button className="primary-gradient-main-btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryGradientBtn;
