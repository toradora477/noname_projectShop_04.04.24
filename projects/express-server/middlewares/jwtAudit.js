const jwt = require('jsonwebtoken');
const { ROLES } = require('../common_constants/business');
const { allUsersExport } = require('../routes/auth/actions');

const guestJWT = (req, res, next, role = 100) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;

      // const verifiedUser = allUsersExport().find((u) => u._id + '' === user._id + '');
      // req.user.p = verifiedUser.p;
      const correctRole = ROLES[user.role] <= role;

      if (correctRole) next();
      else res.sendStatus(401);
    });
  } else {
    res.sendStatus(401);
  }
}; // TODO

const authenticateJWT = (req, res, next, role = ROLES.client) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;

      const verifiedUser = allUsersExport().find((u) => u._id + '' === user._id + '');

      req.user.p = verifiedUser.p;
      const correctRole = ROLES[user.role] <= role;

      if (correctRole) next();
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
