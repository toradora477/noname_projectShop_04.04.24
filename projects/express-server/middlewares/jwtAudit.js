const jwt = require('jsonwebtoken');
const { ROLES } = require('../common_constants/business');
const { log } = require('../tools');
const { allUsersExport } = require('../routes/auth/actions');

const reqLogMiddleware = (req) => {
  const { body, user, originalUrl } = req;
  log.info({
    type: LOG_TYPE.REQ,
    body,
    user: user || 'anon',
    originalUrl,
  });
};

const guestJWT = (req, res, next, role = 100) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      reqLogMiddleware(req);

      const verifiedUser = allUsersExport().find((u) => u._id + '' === user._id + '');
      req.user.p = verifiedUser.p;
      const correctRole = ROLES[user.role] <= role;
      const userNotFired = verifiedUser?.fired !== true;

      if (correctRole && userNotFired) next();
      else res.sendStatus(401);
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateJWT = (req, res, next, role = ROLES.user) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      reqLogMiddleware(req);

      const verifiedUser = allUsersExport().find((u) => u._id + '' === user._id + '');
      req.user.p = verifiedUser.p;
      const correctRole = ROLES[user.role] <= role;
      const userNotFired = verifiedUser?.fired !== true;

      if (correctRole && userNotFired) next();
      else res.sendStatus(401);
    });
  } else {
    res.sendStatus(401);
  }
};

const adminJWT = (req, res, next) => {
  authenticateJWT(req, res, next, ROLES.admin);
};

module.exports = {
  authenticateJWT,
  adminJWT,
  guestJWT,
};
