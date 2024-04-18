import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';

import { setModal, setUserAuth } from '../../store/commonReducer';

import { PrimaryGradientBtn, Modal, Text } from '../../components';

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
      <div className="auth-modal">
        <Text mt={0} fz={60} fw={700}>
          Вхід
        </Text>
        <Text mt={26}>Увійдіть під своїми даними, які вводили під час реєстрації.</Text>

        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={handleLoginChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
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
      </div>
    </Modal>
  );
};

export default Auth;
