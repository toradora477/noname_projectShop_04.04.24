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
  const novaPoshtaBranches = useSelector((state) => state.common.novaPoshtaBranches);

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
  // const handleCityChange = (e) => setCity(e.target.value);
  // const handleRegionChange = (e) => setRegion(e.target.value);

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

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  console.log('filteredCities?.length)', filteredCities?.length);

  const handleRegionChange = (e) => {
    const region = e.target.value;
    console.log('region', region);
    setSelectedRegion(region);
    setSelectedCity('');
    setFilteredAddresses([]);
    const cities = novaPoshtaBranches?.filter((branch) => branch.SettlementAreaDescription === region)?.map((branch) => branch.SettlementDescription);
    console.log('novaPoshtaBranches?.length)', novaPoshtaBranches?.length);
    console.log('cities?.length)', cities?.length);
    setFilteredCities([...new Set(cities)]);
    console.log('[...new Set(cities)])', [...new Set(cities)]);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    const addresses = novaPoshtaBranches
      ?.filter((branch) => branch.SettlementAreaDescription === selectedRegion && branch.SettlementDescription === city)
      // ?.filter((branch) => branch.SettlementDescription === city)
      ?.map((branch) => branch.Description);
    console.log('[...new Set(addresses)])', addresses);
    setFilteredAddresses(addresses);
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

      {isClient && novaPoshtaBranches && (
        <Fragment>
          <Title mt={32} children="Доставка" />
          <Label>Відділення Нової Пошти</Label>
          <div>
            <label>Область</label>
            <select value={selectedRegion} onChange={handleRegionChange}>
              <option value="">Оберіть область</option>
              {[...new Set(novaPoshtaBranches.map((branch) => branch.SettlementAreaDescription))].map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          {selectedRegion && (
            <div>
              <label>Місто</label>
              <select value={selectedCity} onChange={handleCityChange}>
                <option value="">Оберіть місто</option>
                {filteredCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedCity && (
            <div>
              <label>Адреса</label>
              <select>
                <option value="">Оберіть адресу</option>
                {filteredAddresses.map((address, index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Fragment>
      )}

      <PrimaryButton onClick={onSubmit} mt={32}>
        Зберегти зміни
      </PrimaryButton>
    </div>
  );
};

export default CardAccount;
