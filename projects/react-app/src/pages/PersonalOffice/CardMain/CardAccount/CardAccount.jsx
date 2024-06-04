import React, { useState } from 'react';
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
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 0} mb={mb ?? 0} sz={18} fw={700} />,
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 0} mb={mb ?? 4} fs={12} fw={600} color="dark_gray" />,
  ];

  const [password, setPassword] = useState(userAuth?.password ?? '');
  const [email, setEmail] = useState(userAuth?.password ?? '');
  const [firstName, setFirstName] = useState(userAuth?.firstName ?? '');
  const [lastName, setLastName] = useState(userAuth?.lastName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(userAuth?.phoneNumber ?? '');
  const [city, setCity] = useState(userAuth?.city ?? '');
  const [region, setRegion] = useState(userAuth?.region ?? '');
  const [address, setAdress] = useState(userAuth?.address ?? '');

  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const onSubmit = () => {
    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      city: city ?? undefined,
      region: region ?? undefined,
      address: address ?? undefined,
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

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setRegion(region);
    setCity('');

    setFilteredAddresses([]);
    const cities = novaPoshtaBranches?.filter((branch) => branch.SettlementAreaDescription === region)?.map((branch) => branch.SettlementDescription);

    setFilteredCities([...new Set(cities)]);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;

    setCity(city);
    const addresses = novaPoshtaBranches
      ?.filter((branch) => branch.SettlementAreaDescription === region && branch.SettlementDescription === city)

      ?.map((branch) => branch.Description);

    setFilteredAddresses(addresses);
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAdress(address);
  };

  return (
    <div>
      <Title children="Особиста інформація" />
      <Box mt={16} mb={24} className="input-group">
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
      <FlexBox mb={24}>
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
      <FlexBox mb={24}>
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

      {isClient && novaPoshtaBranches ? (
        <Box>
          <FlexBox mb={24}>
            <Box>
              <Label>Область</Label>
              <select value={region} onChange={handleRegionChange} required>
                <option value="">Оберіть область</option>
                {[...new Set(novaPoshtaBranches.map((branch) => branch.SettlementAreaDescription))].map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </Box>
            &nbsp;&nbsp;
            <Box>
              <Label>Місто</Label>

              <select disabled={!region} value={city} onChange={handleCityChange} required>
                <option value="">Оберіть місто</option>
                {filteredCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Box>
          </FlexBox>

          <Box>
            <Label>Відділення Нової Пошти</Label>

            <select disabled={!city} value={address} onChange={handleAddressChange} required>
              <option value="">Оберіть адресу</option>
              {filteredAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </Box>
        </Box>
      ) : (
        <Box>
          <FlexBox mb={24}>
            <Box>
              <Label>Область</Label>
              <input className="order-form-input" type="text" aria-label="input reqion" value={region} onChange={handleRegionChange} required />
            </Box>
            &nbsp;&nbsp;
            <Box>
              <Label>Місто</Label>
              <input className="order-form-input" type="text" aria-label="input city" value={city} onChange={handleCityChange} required />
            </Box>
          </FlexBox>
          <Box>
            <Label>Адреса</Label>
            <input className="order-form-input" type="text" aria-label="input address" value={address} onChange={handleAddressChange} required />
          </Box>
        </Box>
      )}

      <PrimaryButton onClick={onSubmit} mt={32}>
        Зберегти зміни
      </PrimaryButton>
    </div>
  );
};

export default CardAccount;
