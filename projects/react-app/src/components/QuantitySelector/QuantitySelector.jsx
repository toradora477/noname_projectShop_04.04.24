import React from 'react';
import './QuantitySelector.scss';

const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-selector">
      <button children="-" type="button" onClick={onDecrease} disabled={quantity <= 0} />
      <input aria-label="number products" type="text" value={quantity} readOnly />
      <button children="+" type="button" onClick={onIncrease} />
    </div>
  );
};

export default QuantitySelector;
