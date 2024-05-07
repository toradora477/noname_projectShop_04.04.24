import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request } from '../../tools';
import { setModal } from '../../store/commonReducer';
import { PrimaryButton, Modal, Typography, Box, FlexBox } from '../../components';
import { REGISTER } from '../../common_constants/modals';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registerRequest = () => {
    const body = {
      email: email,
      password: password,
    };

    request.post('/auth/clientRegistration', body, (res) => {
      if (res.error) {
        console.error('Registration failed:', res.error);
      } else {
        console.log('Registration successful:', res.message);
        // Optionally, you can dispatch an action to close the registration modal
        // dispatch(setModal());
      }
    });
  };

  return (
    <Modal position="center" btnClose={false}>
      <div className="auth-modal">
        <Typography fs={32} fw={700} mt={0}>
          Реєстрація
        </Typography>
        <Typography mt={16}>Заповніть поля нижче для реєстрації нового облікового запису.</Typography>

        <form>
          <Box mt={32} className="input-group">
            <Typography fs={12} fw={600} mb={4}>
              Email
            </Typography>
            <input placeholder="name@example.com" aria-label="email" type="email" id="email" name="email" onChange={handleEmailChange} />
          </Box>
          <Box mt={24} className="input-group">
            <Typography fs={12} fw={600} mb={4}>
              Пароль
            </Typography>
            <input
              placeholder="мін. 8 символів"
              aria-label="password"
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </Box>

          <PrimaryButton mt={40} children="Зареєструватися" onClick={registerRequest} />
        </form>
      </div>
    </Modal>
  );
};

export default Register;
