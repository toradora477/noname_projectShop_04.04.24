import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserAuth } from '../../../../store/commonReducer';
import { PrimaryButton, Typography, Box, FlexBox } from '../../../../components';

import { request } from '../../../../tools';

import '../../PersonalOffice.scss';

const CardAccount = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.common.userAuth);
  const { isClient } = useSelector((state) => state.common.accessRoles);

  const [Title, Label] = [
    ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />,
    ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} color="dark_gray" />,
  ];

  const [password, setPassword] = useState(userAuth?.password ?? '');
  const [email, setEmail] = useState(userAuth?.password ?? '');
  const [firstName, setFirstName] = useState(userAuth?.firstName ?? '');
  const [lastName, setLastName] = useState(userAuth?.lastName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(userAuth?.phoneNumber ?? '');
  const [city, setCity] = useState(userAuth?.city ?? '');
  const [region, setRegion] = useState(userAuth?.region ?? '');
  // const [novaPoshtaBranches, setNovaPoshtaBranches] = useState([]);
  // const [selectedNovaPoshtaBranch, setSelectedNovaPoshtaBranch] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);

  // const handleNovaPoshtaBranchChange = (e) => {
  //   setSelectedNovaPoshtaBranch(e.target.value);
  // };

  const onSubmit = () => {
    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      city: city,
      region: region,
      // novaPoshtaBranch: selectedNovaPoshtaBranch,
    };

    const filteredBody = Object.fromEntries(Object.entries(body).filter(([key, value]) => value !== ''));

    request.post(
      '/auth/editAccount',
      filteredBody,
      (res) => {
        dispatch(updateUserAuth(res.data));
      },
      (error) => {
        console.error('Помилка відправлення даних:', error);
      },
    );
  };

  return (
    <div>
      <Title mt={8} children="Особиста інформація" />
      <Box mt={12} className="input-group">
        <Label>Пароль входу</Label>
        <input
          placeholder="мін. 8 символів"
          aria-label="password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Box>
      <FlexBox>
        <Box className="input-group">
          <Label>Ім'я</Label>
          <input
            placeholder="Ім'я"
            aria-label="firstName"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </Box>
        &nbsp;&nbsp;
        <Box className="input-group">
          <Label>Прізвище</Label>
          <input
            placeholder="Прізвище"
            aria-label="lastName"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </Box>
      </FlexBox>
      <FlexBox>
        <Box className="input-group">
          <Label>Номер телефону</Label>
          <input
            placeholder="Номер телефону"
            aria-label="phoneNumber"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Box>
        &nbsp;&nbsp;
        <Box className="input-group">
          <Label>Email</Label>
          <input placeholder="name@example.com" aria-label="email" type="text" id="email" name="email" value={email} onChange={handleEmailChange} />
        </Box>
      </FlexBox>
      {isClient && (
        <Fragment>
          <Title mt={32} children="Доставка" />
          <FlexBox mt={12}>
            <Box className="input-group">
              <Label>Місто</Label>
              <input placeholder="Місто" aria-label="city" type="text" id="city" name="city" value={city} onChange={handleCityChange} />
            </Box>
            &nbsp;&nbsp;
            <Box className="input-group">
              <Label>Область</Label>
              <input placeholder="Область" aria-label="region" type="text" id="region" name="region" value={region} onChange={handleRegionChange} />
            </Box>
          </FlexBox>

          {/* <Box className="input-group">
            <Label>Відділення Нової Пошти</Label>
            <select
              aria-label="novaPoshtaBranch"
              id="novaPoshtaBranch"
              name="novaPoshtaBranch"
              value={selectedNovaPoshtaBranch}
              onChange={handleNovaPoshtaBranchChange}
            >
              <option value="">Оберіть відділення Нової Пошти</option>
              {novaPoshtaBranches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </Box> */}
        </Fragment>
      )}

      <PrimaryButton onClick={onSubmit} mt={32}>
        Зберегти зміни
      </PrimaryButton>
    </div>
  );
};

export default CardAccount;
