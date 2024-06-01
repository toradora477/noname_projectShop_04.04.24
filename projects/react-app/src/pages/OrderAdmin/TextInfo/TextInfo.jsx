import React from 'react';
import { Typography } from '../../../components';
import '../OrderAdmin.scss';

const TextInfo = ({ label, text }) => {
  if (![typeof label === 'string', (typeof text === 'string' && text.trim() !== '' && text !== '-') || typeof text === 'number'].every(Boolean))
    return null;

  return (
    <span className="order-info-row">
      <Typography className="order-info-label" sz={16} fw={600} children={label ?? ''} />
      <Typography className="order-info-text" sz={14} children={text ?? ''} />
    </span>
  );
};

export default TextInfo;
