const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');
const { authenticateJWT } = require('../../middlewares/jwtAudit');
const { updateUser } = require('./actions');
const { ExtendedError } = require('../../tools');

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const collection = req.app.locals.client.db(DB).collection(COLLECTIONS.USERS);

    const user = await collection.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(401).json({ status: false, noUser: true });
    }

    const secretOrPrivateKey = process.env.TOKEN_SECRET;
    const encryptionOfPersonalData = {
      _id: user._id,
      username: user.username,
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

module.exports = router;
