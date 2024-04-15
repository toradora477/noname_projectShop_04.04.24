const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { log } = require('../../tools');
const { DB, COLLECTIONS } = require('../../common_constants/db');

router.post('/login', async (req, res) => {
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

  res.status(200).json(responseData);

  log.info({
    url: req.originalUrl,
    method: req.method,
    encryptionOfPersonalData,
    operation: 'Logging and encryption of personal data in JWT',
  });
});

module.exports = router;
