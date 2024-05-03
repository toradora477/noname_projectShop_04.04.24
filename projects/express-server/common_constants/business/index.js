const DEFAULT_USER = {
  password: 'pass',
  role: 'admin',
  username: 'email@gmail.com',
  name: 'adminUser',
  p: 'sh',
};

const HTTP_METHODS = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
};

const ROLES = {
  admin: 0,
  client: 99,
  guest: 999,
};

module.exports = { DEFAULT_USER, HTTP_METHODS, ROLES };
