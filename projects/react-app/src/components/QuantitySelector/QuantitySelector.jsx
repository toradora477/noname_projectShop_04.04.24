import React from 'react';
import './QuantitySelector.scss';

const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={onDecrease} disabled={quantity <= 0}>
        -
      </button>
      <input aria-label="number products" type="text" value={quantity} readOnly />
      <button type="button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
