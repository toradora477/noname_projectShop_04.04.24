import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';
import { setModal, setUserAuth } from '../../store/commonReducer';
import { PrimaryGradientBtn, Modal, Typography, Box, FlexBox } from '../../components';
import './Auth.scss';

const Auth = () => {
  const dispatch = useDispatch();

  const [TItle, Label] = [
    ({ children }) => <Typography children={children} fs={60} fw={700} />,
    ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} />,
  ];

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
        <TItle>Вхід</TItle>
        <Typography mt={16}>Увійдіть під своїми даними, які вводили під час реєстрації.</Typography>

        <form>
          <Box mt={32} className="input-group">
            <Label>Email</Label>
            <input placeholder="name@example.com" aria-label="login" type="text" id="email" name="email" onChange={handleLoginChange} />
          </Box>
          <Box mt={24} className="input-group">
            <Label>Пароль</Label>
            <input
              placeholder="мін. 8 символів"
              aria-label="password"
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </Box>
          <FlexBox mt={24} className="save-group">
            <input aria-label="save auth" type="checkbox" id="myCheckbox" /> &nbsp;
            <Typography> Запам’ятати мене</Typography>
          </FlexBox>

          <PrimaryGradientBtn mt={40} children="УВІЙТИ" onClick={loginRequest} />
        </form>
        <Box mt={28} className="signup-group ">
          <button className="btn-signup">
            <Typography color="primary">Забули пароль?</Typography>
          </button>
        </Box>
        <FlexBox mt={106} className="signup-group">
          <Typography>Не маєте акаунта?</Typography> &nbsp;
          <button className="btn-signup">
            <Typography color="primary">Зареєструватися</Typography>
          </button>
        </FlexBox>
      </div>
    </Modal>
  );
};

export default Auth;
