import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';

import { setModal, setUserAuth } from '../../store/commonReducer';

import { PrimaryGradientBtn, Modal, Text, Box } from '../../components';

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
          <Box className="input-group">
            <Text mt={30} mb={4} fz={12} fw={600}>
              Email
            </Text>
            <input placeholder="name@example.com" aria-label="login" type="text" id="email" name="email" onChange={handleLoginChange} />
          </Box>
          <Box className="input-group">
            <Text mt={12} mb={4} fz={12} fw={600}>
              Пароль
            </Text>
            <input
              placeholder="мін. 8 символів"
              aria-label="password"
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </Box>
          <Box className="save-group">
            <input type="checkbox" id="myCheckbox" /> &nbsp;
            <Text mt={0}> Запам’ятати мене</Text>
          </Box>

          <PrimaryGradientBtn mt={40} children="УВІЙТИ" onClick={loginRequest} />
        </form>

        <div className="signup">
          <p className="text-signup">
            <b>Забули пароль?</b>
          </p>
          <Text mt={0}>Забули пароль?</Text>
          <Text mt={0}>Не маєте акаунта? Зареєструватися</Text>

          <button className="btn-signup">СТВОРИТИ АККАУНТ</button>
        </div>
      </div>
    </Modal>
  );
};

export default Auth;
