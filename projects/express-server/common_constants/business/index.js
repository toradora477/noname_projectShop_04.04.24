const DATE_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

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

module.exports = { DATE_OPTIONS, DEFAULT_USER, HTTP_METHODS };
