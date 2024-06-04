import React from 'react';
import clsx from 'clsx';
import './ColorSquare.scss';

const ColorSquare = ({ color = 'rgba(255, 255, 255, 0.5)', text = '', mr = 0, isChoiceSelect }) => {
  return (
    <div
      className={clsx('color-square', {
        'is-selected': isChoiceSelect,
        'not-selected': !isChoiceSelect,
      })}
      style={{
        backgroundColor: color,
        '--mr': `${mr}px`, // использование CSS переменной для установки отступа
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default ColorSquare;
