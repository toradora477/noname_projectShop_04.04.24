import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';

import { setModal, setUserAuth } from '../../store/commonReducer';

import { PrimaryGradientBtn, Modal } from '../../components';

import './Auth.scss';

const Auth = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const closeModal = () => {
    dispatch(setModal());
  };

  const loginRequest = () => {
    const body = {
      username: login,
      password: password,
    };

    request.post('/auth/login', body, (res) => {
      if (res.noAccess) {
        console.error('res.noAccess', res.noAccess);
      } else {
        window.localStorage.setItem('accessToken', res.accessToken);
        console.log('res.accessToken', res.accessToken);
        dispatch(setUserAuth(getTokenData(res.accessToken)));
        dispatch(setModal());
      }
    });
  };

  return (
    <Modal position="center" btnClose={false}>
      <div className="auth_modal">
        <div className="auth_header">
          <h2>Вхід</h2>
          {/* <button className="close-button" onClick={closeModal}>
            Закрити
          </button> */}
        </div>
        <p>Увійдіть під своїми даними, які вводили під час реєстрації.</p>

        <form>
          <div className="input-group">
            <label htmlFor="email">
              Email <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="text" id="email" name="email" onChange={handleLoginChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              Пароль <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="password" id="password" name="password" onChange={handlePasswordChange} />
          </div>
          <PrimaryGradientBtn children="УВІЙТИ" onClick={loginRequest} />
        </form>
        <p> Запам’ятати мене</p>

        <div className="signup">
          <p className="text-signup">
            <b>Ще немає аккаунту?</b>
          </p>
          <button className="btn-signup">СТВОРИТИ АККАУНТ</button>
        </div>
        {/* <hr /> */}
      </div>
    </Modal>
  );
};

export default Auth;
