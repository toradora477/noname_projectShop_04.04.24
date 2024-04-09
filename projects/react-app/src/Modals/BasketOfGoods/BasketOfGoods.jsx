import React, { useState } from 'react';
import './BasketOfGoods.css';

const BasketOfGoods = ({ isOpen, onClose, cartItems }) => {
  return (
    <div className={`basket-of-goods ${isOpen ? 'open' : ''}`}>
      <div className="cart-content">
        <h2>Корзина</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default BasketOfGoods;
