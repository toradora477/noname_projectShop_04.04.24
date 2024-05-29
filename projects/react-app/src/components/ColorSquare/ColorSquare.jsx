import React from 'react';

const ColorSquare = ({ color = 'rgba(255, 255, 255, 0.5)', text = '', mr = 0, isChoiceSelect }) => {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: isChoiceSelect ? '2px solid green' : '1px solid #000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        marginRight: mr,
        textAlign: 'center',
        lineHeight: '24px',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: '14px' }}>{text}</span>
    </div>
  );
};

export default ColorSquare;
