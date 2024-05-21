import React from 'react';

const SizeSquare = ({ color, text }) => {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: '1px solid #000000',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Прозрачный фон
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span style={{ fontSize: '14px' }}>{text}</span>
    </div>
  );
};

export default SizeSquare;
