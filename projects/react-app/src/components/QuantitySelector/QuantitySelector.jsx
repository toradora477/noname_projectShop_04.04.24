import React from 'react';
import './QuantitySelector.scss';

const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-selector">
      <button onClick={onDecrease} disabled={quantity <= 0}>
        -
      </button>
      <input type="text" value={quantity} readOnly />
      <button onClick={onIncrease}>+</button>
    </div>
  );
};

export default QuantitySelector;
