import React from 'react';
import clsx from 'clsx';
import { Typography } from '../../components';
import './Divider.scss';

const Divider = ({ text, sz, fw, color }) => {
  const Text = ({ children, sz, fw }) => <Typography children={children} sz={sz} fw={fw} style={{ padding: '0 10px' }} />;
  return (
    <div className="divider-container">
      <div className={clsx('divider-line', color)} />
      {text && <Text sz={sz} fw={fw} children={text} />}
      <div className={clsx('divider-line', color)} />
    </div>
  );
};

export default Divider;
