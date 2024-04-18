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
        <Text fs={60} fw={700}>
          Вхід
        </Text>
        <Text mt={16}>Увійдіть під своїми даними, які вводили під час реєстрації.</Text>

        <form>
          <Box mt={32} className="input-group">
            <Text mb={4} fs={12} fw={600}>
              Email
            </Text>
            <input placeholder="name@example.com" aria-label="login" type="text" id="email" name="email" onChange={handleLoginChange} />
          </Box>
          <Box mt={24} className="input-group">
            <Text mb={4} fs={12} fw={600}>
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
          <Box mt={24} className="save-group">
            <input aria-label="save auth" type="checkbox" id="myCheckbox" /> &nbsp;
            <Text> Запам’ятати мене</Text>
          </Box>

          <PrimaryGradientBtn mt={40} children="УВІЙТИ" onClick={loginRequest} />
        </form>
        <Box mt={28} className="signup-group ">
          <button className="btn-signup">
            <Text className="text-green">Забули пароль?</Text>
          </button>
        </Box>
        <Box mt={106} className="signup-group">
          <Text>Не маєте акаунта?</Text> &nbsp;
          <button className="btn-signup">
            <Text className="text-green">Зареєструватися</Text>
          </button>
        </Box>
      </div>
    </Modal>
  );
};

export default Auth;
