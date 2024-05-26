import React from 'react';

const ColorSquare = ({ color }) => {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        backgroundColor: color,
      }}
    />
  );
};

export default ColorSquare;
