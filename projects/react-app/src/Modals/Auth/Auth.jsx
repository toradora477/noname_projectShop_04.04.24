import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';
import { setModal, setUserAuth } from '../../store/commonReducer';
import { PrimaryButton, Modal, Typography, Box, FlexBox } from '../../components';
import { REGISTER } from '../../common_constants/modals';

import './Auth.scss';

const Auth = () => {
  const dispatch = useDispatch();

  const [TItle, Label] = [
    ({ children }) => <Typography children={children} fs={60} fw={700} />,
    ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} />,
  ];

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [noConsumer, setNoConsumer] = useState(null);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginRequest = () => {
    const body = {
      email: login,
      password: password,
    };

    request.post('/auth/login', body, (res) => {
      if (res.noConsumer) return setNoConsumer(true);

      window.localStorage.setItem('accessToken', res.accessToken);
      setNoConsumer(null);

      dispatch(setUserAuth(getTokenData(res.accessToken)));
      dispatch(setModal());
    });
  };

  const registerOpen = () => dispatch(setModal({ name: REGISTER }));

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

          <PrimaryButton mt={40} children="УВІЙТИ" onClick={loginRequest} />

          {noConsumer && <Typography fs={12} fw={500} mt={8} color="red" children="Помилка. Користувач з такими параметрами не існує" />}
        </form>
        <Box mt={28} className="signup-group ">
          <button className="btn-signup">
            <Typography color="primary">Забули пароль?</Typography>
          </button>
        </Box>
        <FlexBox mt={106} className="signup-group">
          <Typography>Не маєте акаунта?</Typography> &nbsp;
          <button className="btn-signup" onClick={registerOpen}>
            <Typography color="primary">Зареєструватися</Typography>
          </button>
        </FlexBox>
      </div>
    </Modal>
  );
};

export default Auth;
