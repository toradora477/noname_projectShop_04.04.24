import React from 'react';
import './PrimaryPurpleBtn.scss';

const PrimaryPurpleBtn = ({ onClick, children }) => {
  return (
    <button className="primary-purple-btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryPurpleBtn;
