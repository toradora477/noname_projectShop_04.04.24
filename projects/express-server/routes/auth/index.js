const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { DB, COLLECTIONS } = require('../../common_constants/db');

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

module.exports = router;
