const express = require('express');
const app = express();
const cors = require('cors');
const timeout = require('connect-timeout');

require('dotenv').config({ path: '.env' });

const { log } = require('./tools');

const isDev = process.env.DEV === 'true';
const getPort = process.env.PORT || 3005;

if (isDev) {
  app.listen(getPort, () => {
    log.success(`Authentication service started on port ${getPort}`);
  });
} else {
  // TODO тут треба перехід на продакшен
}
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(timeout(240000));
