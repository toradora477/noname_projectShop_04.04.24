import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request, getTokenData } from '../../tools';

import Modal from '../../components/Modal';
import { setModal, setUserAuth } from '../../store/commonReducer';
import PrimaryPurpleBtn from '../../components/PrimaryPurpleBtn';
import icon_user from '../../images/icon_user.svg';
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
        // notification.info({
        //   message: 'Для отримання доступу треба звернутися до адміністратора.',
        //   style: { wordWrap: 'break-word' },
        // });
        console.log('res.noAccess', res.noAccess);
      } else {
        window.localStorage.setItem('accessToken', res.accessToken);
        console.log('res.accessToken', res.accessToken);
        dispatch(setUserAuth(getTokenData(res.accessToken)));
      }
    });
  };

  return (
    <Modal position="right" btnClose={false}>
      <div className="auth_modal">
        <div className="auth_header">
          <h2>Увійти</h2>
          <button className="close-button" onClick={closeModal}>
            Закрити
          </button>
        </div>
        <hr />
        <form>
          <div className="input-group">
            <label htmlFor="email">
              Логін чи e-mail адреса <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="text" id="email" name="email" onChange={handleLoginChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              Пароль <span children="*" style={{ color: 'red' }} />
            </label>
            <input type="password" id="password" name="password" onChange={handlePasswordChange} />
          </div>
          <PrimaryPurpleBtn children="УВІЙТИ" onClick={loginRequest} />
        </form>
        <hr />
        <div className="signup">
          <img className="user-img" src={icon_user} alt="Shopping Cart" />
          <p className="text-signup">
            <b>Ще немає аккаунту?</b>
          </p>
          <button className="btn-signup">СТВОРИТИ АККАУНТ</button>
        </div>
        <hr />
      </div>
    </Modal>
  );
};

export default Auth;
