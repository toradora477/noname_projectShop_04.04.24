import React from 'react';
import { Typography } from '../';
import './RowGroup.scss';

const RowGroup = ({ children }) => {
  return <div className="row-group" children={children} />;
};

const TextInfo = ({ label, text, component }) => {
  if (
    ![typeof label === 'string', component || (typeof text === 'string' && text.trim() !== '' && text !== '-') || typeof text === 'number'].every(
      Boolean,
    )
  ) {
    return null;
  }

  return (
    <span className="row-group-row">
      <Typography className="row-group-label" sz={16} fw={600} children={label ?? ''} />
      {text && <Typography className="row-group-text" sz={14} children={text ?? ''} />}
      {component}
    </span>
  );
};

RowGroup.TextInfo = TextInfo;

export default RowGroup;
