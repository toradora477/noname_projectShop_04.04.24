import React from 'react';
import { request } from '../../tools';

import { Modal } from '../../components';

const BasketOfGoods = () => {
  const onSubmit = () => {
    console.log('true');
  };

  return (
    <Modal position="center">
      <button className="basket-button" onClick={onSubmit}>
        <span className="icon">{/* <ShoppingCartOutlined /> */}2</span>
        <span className="price">"$19.99"</span>
      </button>
    </Modal>
  );
};

export default BasketOfGoods;
