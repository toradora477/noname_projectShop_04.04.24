import React from 'react';
import './Empty.scss';
import { icon_empty_box } from '../../images';

const Empty = ({ description, w = 'auto', h = 'auto' }) => {
  return (
    <div className="empty-container" style={{ height: h, width: w }}>
      <img src={icon_empty_box} alt="svg empty" className="empty-icon" />
      <div className="empty-description">{description}</div>
    </div>
  );
};

export default Empty;
