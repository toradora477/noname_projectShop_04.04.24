const COMPANY_NAME = 'The Dressery Store'; // TODO Змінити на реальні дані

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
  client: 99,
  guest: 999,
};

const PRODUCT_CATEGORIES = [
  {
    value: 0,
    label: 'Верхній одяг',
    subcategories: [
      // ТЕПЛИЙ ОДЯГ
      { value: 0, label: 'Куртки' },
      { value: 1, label: 'Зимові куртки' },
      { value: 2, label: 'Худі' },
      { value: 3, label: 'Светри' },
      { value: 4, label: 'Світшоти' },
      { value: 5, label: 'Кардигани' },
      // ЛЕГКИЙ ОДЯГ
      { value: 6, label: 'Футболки' },
      { value: 7, label: 'Сорочки' },
    ],
  },
  {
    value: 1,
    label: 'Нижній одяг',
    subcategories: [
      // ПОВСЯКДЕННИЙ ОДЯГ
      { value: 0, label: 'Штани' },
      { value: 1, label: 'Джинси' },
      // ЛЕГКИЙ ЛІТНІЙ ОДЯГ
      { value: 2, label: 'Шорти' },
    ],
  },
  {
    value: 2,
    label: 'Взуття',
    subcategories: [
      // ВЗУТТЯ
      { value: 0, label: 'Кросівки' },
      { value: 1, label: 'Кеди' },
      // ЛІТНЄ ВЗУТТЯ
      { value: 2, label: 'Тапки' },
    ],
  },
  {
    value: 3,
    label: 'Аксесуари',
    subcategories: [
      // ГОЛОВНІ УБОРИ
      { value: 0, label: 'Кепки' },
      { value: 1, label: 'Панами' },
      { value: 2, label: 'Шапки' },
      // ОКУЛЯРИ
      { value: 3, label: 'Сонцезахисні окуляри' },
      // СУМКИ
      { value: 4, label: 'Сумки' },
    ],
  },
];

const NAME_SELECT = {
  ACCOUNT: 'Акаунт',
  WISHLIST: 'Список бажань',
  BASKETLIST: 'Кошик',
};

module.exports = {
  COMPANY_NAME,
  WORKING_HOURS,
  WORKING_DAYS,
  ACCESS_TOKEN,
  HTTP_METHODS,
  ROLES,
  PRODUCT_CATEGORIES,
  NAME_SELECT,
};
