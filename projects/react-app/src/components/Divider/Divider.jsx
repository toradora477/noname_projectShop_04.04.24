import React from 'react';
import { Typography } from '../../components';
import './Divider.scss';

const Divider = ({ text, sz, fw }) => {
  const Text = ({ children, sz, fw }) => <Typography children={children} sz={sz} fw={fw} style={{ padding: '0 10px' }} />;
  return (
    <div className="divider-container">
      <div className="divider-line" />
      {text && <Text sz={sz} fw={fw} children={text} />}
      <div className="divider-line" />
    </div>
  );
};

export default Divider;
