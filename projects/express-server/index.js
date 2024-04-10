const express = require('express');
const app = express();

require('dotenv').config({ path: '.env' });

const { log } = require('./tools');

const isDev = process.env.DEV === 'true';
const getPort = process.env.PORT;

console.log(isDev);
console.log(getPort);

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// app.listen(port, () => {
//   console.log(`Сервер запущен на порту ${port}`);
// });

if (isDev) {
  app.listen(getPort, () => {
    log.success(`Authentication service started on port ${getPort}`);
  });
}
