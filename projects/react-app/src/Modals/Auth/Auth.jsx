import React from 'react';
import { request } from '../../tools';
import Modal from '../../components/Modal';
import PrimaryPurpleBtn from '../../components/PrimaryPurpleBtn';
import './Auth.scss';

const Auth = () => {
  const handleButtonClick = () => {
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
        <hr />
        <form>
          <div className="input-group">
            <label htmlFor="email">
              Логін чи e-mail адреса <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="text" id="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              Пароль <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="password" id="password" name="password" />
          </div>
          <PrimaryPurpleBtn children="УВІЙТИ" onClick={handleButtonClick} />
        </form>
        <hr />
        <div className="signup">
          <p>Ще немає аккаунту?</p>
          <button>СТВОРИТИ АККАУНТ</button>
        </div>
        <hr />
      </div>
    </Modal>
  );
};

export default Auth;
