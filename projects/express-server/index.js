const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const { MongoClient } = require('mongodb');
const { log } = require('./tools');

require('dotenv').config({ path: '.env' });

const isDev = process.env.DEV === 'true';
const getPort = process.env.PORT || 3005;
const mongoClient = new MongoClient(process.env.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(timeout(240000));
app.use(require('./middlewares/requestLogger'));
app.use(require('./configs/routesConfig'));
app.use(require('./middlewares/handlersError'));

mongoClient
  .connect()
  .then((mongoClient) => {
    log.success('MongoDB connected successfully');

    if (isDev) {
      app.listen(getPort, () => {
        log.success(`The server is running on the port ${getPort}`);
      }); // Listening port after successfully connecting to MongoDB
    } else {
      // https.createServer(getCredentials(defaultCredentialsPath), app).listen(getPort, () => {
      //   log.success(`API service started on port ${getPort}`);
      // });
      // TODO тут треба перехід на продакшен
    }

    app.locals.client = mongoClient;
  })
  .catch((err) => {
    log.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }); // Connect to MongoDB when the server starts
