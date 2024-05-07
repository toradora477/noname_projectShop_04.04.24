const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT, guestJWT } = require('../../middlewares/jwtAudit');
const { updateUser } = require('./actions');
const { ExtendedError, getNextSequenceValue } = require('../../tools');

router.post('/login', guestJWT, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [clients, users] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.CLIENTS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.USERS),
    ];

    if (![email, password].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const clientPromise = clients.findOne({ email, password });
    const userPromise = users.findOne({ email, password });

    const [client, user] = await Promise.all([clientPromise, userPromise]);

    if (!user && !client) {
      res.status(200).json({
        status: true,
        noConsumer: true,
      });
      req.loggingData = {
        log: 'Login is not possible because there is no such customer in the database',
        operation: 'findOne for collection CLIENTS and USERS',
        email,
      };
      return;
    }

    const consumer = client ?? user;

    const secretOrPrivateKey = process.env.TOKEN_SECRET;
    const encryptionOfPersonalData = {
      _id: consumer._id,
      email: consumer.email,
      role: consumer.role,
    };

    const responseData = {
      status: true,
      accessToken: jwt.sign(encryptionOfPersonalData, secretOrPrivateKey),
    };

    req.loggingData = {
      log: 'Logging and encryption of personal data in JWT',
      operation: 'findOne for collection USERS',
      personalData: encryptionOfPersonalData,
      createJwt: responseData?.accessToken,
    };

    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
});

router.post('/editUser', authenticateJWT, (req, res, next) => {
  try {
    const { _id } = req.user;

    if (![_id, typeof req.body === 'object'].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    req.body._id = _id;

    const result = updateUser(req, req.body);

    const transportationData = {
      status: true,
    };

    req.loggingData = {
      log: 'editUser',
      operation: 'updateOne for collection USERS',
      'req.body': req.body,
      result: result,
    };
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
}); // TODO Доробити для обох колекцій

router.post('/clientRegistration', guestJWT, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (![email, password].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const [commonParams, clients, users] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.CLIENTS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.USERS),
    ];

    const clientPromise = clients.findOne({ email: email });
    const userPromise = users.findOne({ email: email });

    const [client, user] = await Promise.all([clientPromise, userPromise]);

    if (client || user) {
      res.status(200).json({
        status: true,
        exists: true,
      });
      req.loggingData = {
        log: 'Registration is not possible, because such mail is already registered in the system',
        operation: 'findOne for collection CLIENTS and USERS',
        email,
      };
      return;
    }

    const i = await getNextSequenceValue('clientNextSequenceValue', commonParams);
    const T = new Date();

    const newclient = await clients.insertOne({
      email,
      password,
      T,
      i,
      role: 'client',
    });

    if (!newclient?.insertedId) {
      throw new ExtendedError({
        messageLog: 'Client not created',
        messageJson: 'Помилка сервера. Не вдалося створити клієнта.',
        code: 400,
      });
    }

    const secretOrPrivateKey = process.env.TOKEN_SECRET;
    const encryptionOfPersonalData = { _id: newclient.insertedId, email, role: 'client' };

    const responseData = {
      status: true,
      accessToken: jwt.sign(encryptionOfPersonalData, secretOrPrivateKey),
    };

    req.loggingData = {
      log: 'Register, logging and encryption of personal data in JWT',
      operation: 'insertOne for collection CLIENT',
      personalData: encryptionOfPersonalData,
      createJwt: responseData?.accessToken,
    };

    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
