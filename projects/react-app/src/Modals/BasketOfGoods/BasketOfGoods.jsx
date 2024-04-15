import React from 'react';
import { request } from '../../tools';
import Modal from '../../components/Modal';

const BasketOfGoods = () => {
  const onSubmit = () => {
    const body = {
      actualization: true,
    };

    request.post('/products/info', body, () => {
      console.log('true');
    }); // TODO Тестове для api
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
