const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT } = require('../../middlewares/jwtAudit');

const { ExtendedError } = require('../../tools');

const axios = require('axios');

// router.post('/getNovaPoshtaBranches', async (req, res, next) => {
//   try {
//     // Получение параметров из тела запроса
//     const { city, area } = req.body;

//     // Запрос к API Новой Почты для получения списка отделений
//     const response = await axios.post(
//       'https://api.novaposhta.ua/v2.0/json/',
//       // ,
//       // {
//       // apiKey: 'your_api_key', // Вставьте ваш API ключ Новой Почты
//       // modelName: 'Address',
//       // calledMethod: 'getWarehouses',
//       // methodProperties: {
//       //   CityName: city,
//       //   // Другие параметры для фильтрации по городу, области и т.д., если нужно
//       // },
//       // }
//     );

//     console.log(response);
//     console.log('response');

//     // Проверка успешного ответа
//     if (response.data.success) {
//       // Отправка списка отделений в ответ
//       res.status(200).json(response.data.data);
//     } else {
//       // Если запрос завершился неудачно
//       res.status(500).json({ error: 'Не удалось загрузить список отделений Новой Почты' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
