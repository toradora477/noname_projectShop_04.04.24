const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT, guestJWT } = require('../../middlewares/jwtAudit');
const { updateUser } = require('./actions');
const { ExtendedError, getNextSequenceValue } = require('../../tools');

router.post('/login', guestJWT, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.USERS);

    const user = await collection.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(401).json({ status: false, noUser: true });
    }

    const secretOrPrivateKey = process.env.TOKEN_SECRET;
    const encryptionOfPersonalData = {
      _id: user._id,
      email: user.email,
      role: user.role,
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
});

router.post('/clientRegistration', guestJWT, async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (![email, password].every(Boolean))
      throw new ExtendedError({
        messageLog: 'One or more values are empty.',
        messageJson: 'Помилка клієнта. Одне чи кілька значень пусті.',
        code: 400,
      });

    const T = new Date();

    const commonParams = req.app.locals.client.db(DB).collection(COLLECTIONS.COMMON_PARAMS);
    const clients = req.app.locals.client.db(DB).collection(COLLECTIONS.CLIENTS);
    const users = req.app.locals.client.db(DB).collection(COLLECTIONS.USERS);

    const i = await getNextSequenceValue('clientNextSequenceValue', commonParams);

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

    const newclient = await clients.insertOne({
      email,
      password,
      T,
      i,
    });

    if (!newclient?.insertedId) {
      res.json({
        status: false,
        error: 'client not created',
      });
      return;
    }

    // const responseData = {
    //   status: true,
    //   accessToken: jwt.sign({ _id: newclient.insertedId, email: login, role: 'client' }, process.env.CLIENT_SECRET),
    // };

    // res.status(200).json(responseData);

    const secretOrPrivateKey = process.env.CLIENT_SECRET;
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
