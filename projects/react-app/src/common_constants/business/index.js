const COMPANY_NAME = '“Назва компанії”'; // ! Змінити на реальні дані

const WORKING_HOURS = {
  START_DAY: '11:00',
  END_DAY: '22:00',
};
const WORKING_DAYS = {
  START_WEEK: 'Понеділок',
  END_WEEK: 'Неділя',
};

const ACCESS_TOKEN = 'accessToken';

const HTTP_METHODS = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
};

const ROLES = {
  admin: 0,
  user: 99,
  guest: 999,
};

module.exports = {
  COMPANY_NAME,
  WORKING_HOURS,
  WORKING_DAYS,
  ACCESS_TOKEN,
  HTTP_METHODS,
  ROLES,
};
