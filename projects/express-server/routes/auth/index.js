const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT, guestJWT } = require('../../middlewares/jwtAudit');
const { updateAccounts } = require('./actions');
const { ExtendedError, getNextSequenceValue } = require('../../tools');
const { ObjectId } = require('mongodb');

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

    const findBD = { email, password };

    const clientPromise = clients.findOne(findBD);
    const userPromise = users.findOne(findBD);

    const [client, user] = await Promise.all([clientPromise, userPromise]);

    if (!user && !client) {
      res.status(200).json({
        status: true,
        noAccount: true,
      });
      req.setLoggingData({
        log: 'Login is not possible because there is no such customer in the database',
        operation: 'findOne for collection CLIENTS and USERS',
        email,
      });
      return;
    }

    const account = client ?? user;

    const secretOrPrivateKey = process.env.TOKEN_SECRET;
    const encryptionOfPersonalData = {
      _id: account._id,
      email: account.email,
      role: account.role,
    };

    const responseData = {
      status: true,
      accessToken: jwt.sign(encryptionOfPersonalData, secretOrPrivateKey),
      data: account,
    };

    req.setLoggingData({
      log: 'Logging and encryption of personal data in JWT',
      operation: 'findOne for collection USERS',
      personalData: encryptionOfPersonalData,
      createJwt: responseData?.accessToken,
    });

    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
});

router.post('/editAccount', authenticateJWT, (req, res, next) => {
  try {
    const { _id } = req.user;

    if (![_id, typeof req.body === 'object'].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const { role } = req.user;

    req.body._id = _id;

    const result = updateAccounts(req, req.body, role === 'client' ? COLLECTIONS.CLIENTS : COLLECTIONS.USERS);

    if (!result) {
      throw new ExtendedError({
        messageLog: 'Account not edit',
        messageJson: 'Помилка сервера. Не вдалося оновити акаунт.',
        code: 400,
      });
    }

    const _data = { ...req.body };
    delete _data._id;

    const transportationData = {
      status: true,
      data: _data,
    };

    req.setLoggingData({
      log: 'Edit account',
      operation: 'updateOne for collection USERS or CLIENTS',
      'req.body': req.body,
      result: result,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

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

    const findBD = { email };

    const clientPromise = clients.findOne(findBD);
    const userPromise = users.findOne(findBD);

    const [client, user] = await Promise.all([clientPromise, userPromise]);

    if (client || user) {
      res.status(200).json({
        status: true,
        exists: true,
      });
      req.setLoggingData({
        log: 'Registration is not possible, because such mail is already registered in the system',
        operation: 'findOne for collection CLIENTS and USERS',
        email,
      });
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

    req.setLoggingData({
      log: 'Register, logging and encryption of personal data in JWT',
      operation: 'insertOne for collection CLIENT',
      personalData: encryptionOfPersonalData,
      createJwt: responseData?.accessToken,
    });

    res.status(200).json(responseData);
  } catch (err) {
    next(err);
  }
});

router.get('/getAccountInfo', authenticateJWT, async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!_id)
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const [clients, users] = [
      req.app.locals.client.db(DB).collection(COLLECTIONS.CLIENTS),
      req.app.locals.client.db(DB).collection(COLLECTIONS.USERS),
    ];

    const findBD = { _id: new ObjectId(_id) };

    const clientPromise = clients.findOne(findBD);
    const userPromise = users.findOne(findBD);

    const [client, user] = await Promise.all([clientPromise, userPromise]);

    if (!user && !client) {
      res.status(400).json({ status: true });
      req.setLoggingData({
        log: 'Error find collection',
        operation: 'findOne for collection CLIENTS and USERS',
      });
      return;
    }

    const account = client ?? user;

    const transportationData = {
      status: true,
      data: account,
    };

    req.setLoggingData({
      log: 'Find info data account',
      operation: 'find for collection CLIENTS or USERS',
      dataRes: transportationData.data,
    });
    res.status(200).json(transportationData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
