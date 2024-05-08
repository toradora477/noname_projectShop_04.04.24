const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '.env' });

const isDev = process.env.DEV === 'true';
const getPort = process.env.PORT || 80;
const getDomen = process.env.DOMEN;
const mongoClient = new MongoClient(process.env.MONGO_URL);

const { runInitialSettings, log } = require('./tools');
const { prepareAllUsers } = require('./routes/auth/actions');

const app = express();

runInitialSettings();

app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(timeout(240000));
app.use(require('./middlewares/requestLogger'));
app.use(require('./configs/routesConfig'));
app.use(require('./middlewares/handlersError'));

app.get('/', (_, res) => {
  res.send('hi');
});

mongoClient
  .connect()
  .then((mongoClient) => {
    log.successServer('MongoDB connected successfully');

    prepareAllUsers(mongoClient);

    if (isDev) {
      app.listen(getPort, () => {
        log.successServer(`The server is running on the port ${getPort}`);
      });
    } else {
      app.listen(getPort, getDomen, () => {
        log.successServer(`The server is running on the port ${getPort}`);
      });
      // TODO тут треба перехід на продакшен + використати сервер AWS
    }

    app.locals.client = mongoClient;
  })
  .catch((err) => {
    log.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
