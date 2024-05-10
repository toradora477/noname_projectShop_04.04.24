import React from 'react';
import './Divider.scss';

const Divider = ({ text }) => {
  return (
    <div className="divider-container">
      <div className="divider-line" />
      {text && <div className="divider-text">{text}</div>}
      <div className="divider-line" />
    </div>
  );
};

export default Divider;
