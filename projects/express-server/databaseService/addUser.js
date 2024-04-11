require('dotenv').config();

const { MongoClient } = require('mongodb');
const { DB, COLLECTIONS } = require('../common_constants/db');
const { DEFAULT_USER } = require('../common_constants/business');

const mongoClient = new MongoClient(process.env.MONGO_URL);

const { log } = require('../tools');

const user = {
  password: process.env.USER_PASSWORD || DEFAULT_USER.password,
  role: process.env.USER_ROLE || DEFAULT_USER.role,
  username: process.env.USER_EMAIL || DEFAULT_USER.username,
  name: process.env.USER_NAME || DEFAULT_USER.name,
  p: process.env.USER_P || DEFAULT_USER.p,
};

mongoClient
  .connect()
  .then((mongoClient) => {
    const collection = mongoClient.db(DB).collection(COLLECTIONS.USERS);
    return collection
      .findOne({
        username: user.username,
        name: user.name,
      })
      .then((res) => {
        if (res) {
          log.error('This username is already in use:');
          console.log(res);
          log.info('If you want to add a new user, edit your .env file');
          return;
        }
        return collection.insertOne(user);
      })
      .then((result) => {
        if (result) {
          log.success('User successfully added');
          console.log(user);
        }
      });
  })
  .catch((err) => {
    log.error('Database connection error!');
    console.error(err);
  })
  .finally(() => {
    mongoClient.close();
    process.exit(0);
  });
