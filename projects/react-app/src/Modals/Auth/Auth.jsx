import React from 'react';
import { request } from '../../tools';
import Modal from '../../components/Modal';
import './Auth.scss';

const Auth = () => {
  const onSubmit = () => {
    const body = {
      actualization: true,
    };

    request.post('/products/info', body, () => {
      console.log('true');
    }); // TODO Тестове для api
  };

  return (
    <Modal position="right" btnClose={false}>
      <div className="auth_modal">
        <div className="auth_header">
          <h2>Увійти</h2>
          <button className="close-button">Закрити</button>
        </div>
        <form>
          <div className="input-group">
            <label htmlFor="email">Логін чи e-mail адреса</label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">УВІЙТИ</button>
        </form>
        <div className="options">
          <a href="#">Забули свій пароль?</a>
          <label>
            <input type="checkbox" /> Запам'ятати мене
          </label>
        </div>
        <div className="signup">
          <p>Ще немає аккаунту?</p>
          <button>СТВОРИТИ АККАУНТ</button>
        </div>
      </div>
    </Modal>
  );
};

export default Auth;
