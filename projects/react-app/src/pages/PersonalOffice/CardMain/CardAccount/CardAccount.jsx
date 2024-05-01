// import React, { useState } from 'react';
// import { PrimaryButton, Modal, Typography, Box, FlexBox } from '../../../../components';
// import { request } from '../../../../tools';
// import '../../PersonalOffice.scss';

// const CardAccount = () => {
//   const [TItle, Text, Label] = [
//     ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />,
//     ({ children }) => <Typography children={children} mt={7} sz={13} fw={400} />,
//     ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} color="dark_gray" />,
//   ];

//   const [login, setLogin] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLoginChange = (e) => {
//     setLogin(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const onSubmit = () => {
//     const body = {
//       actualization: true,
//     };

//     request.post('/products/info', body, () => {
//       console.log('true');
//     }); // TODO Тестове для api
//   };

//   return (
//     <div>
//       <TItle children="Особиста інформація" />
//       <Box mt={16} className="input-group">
//         <Label>Пароль входу</Label>
//         <input placeholder="мін. 8 символів" aria-label="password" type="password" id="password" name="password" onChange={handlePasswordChange} />
//       </Box>
//       <Box mt={32} className="input-group">
//         <Label>Email</Label>
//         <input placeholder="name@example.com" aria-label="login" type="text" id="email" name="email" onChange={handleLoginChange} />
//       </Box>

//       <TItle mt={32} children="Доставка" />
//     </div>
//   );
// };

// export default CardAccount;

import React, { useState } from 'react';
import { PrimaryButton, Modal, Typography, Box, FlexBox } from '../../../../components';
import { request } from '../../../../tools';
import '../../PersonalOffice.scss';

const CardAccount = () => {
  const [TItle, Text, Label] = [
    ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />,
    ({ children }) => <Typography children={children} mt={7} sz={13} fw={400} />,
    ({ children }) => <Typography children={children} mb={4} fs={12} fw={600} color="dark_gray" />,
  ];

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    const body = {
      username: login,
      password: password,
    };

    request.post(
      '/auth/editUser',
      body,
      (response) => {
        console.log('Данные успешно отправлены:', response);
      },
      (error) => {
        console.error('Ошибка отправки данных:', error);
      },
    );
  };

  return (
    <div>
      <TItle children="Особиста інформація" />
      <Box mt={16} className="input-group">
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
      <Box mt={32} className="input-group">
        <Label>Email</Label>
        <input placeholder="name@example.com" aria-label="login" type="text" id="email" name="email" value={login} onChange={handleLoginChange} />
      </Box>

      <PrimaryButton onClick={onSubmit} mt={32}>
        Зберегти зміни
      </PrimaryButton>
      {/* Добавьте любые другие компоненты или разметку, которые вам нужны */}
    </div>
  );
};

export default CardAccount;
