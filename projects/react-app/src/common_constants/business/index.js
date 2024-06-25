// const { icons8_t_shirt_96, icons8_shoes_96, icons8_pants_96, icons8_cap_96, subcategory_jackets } = require('../../images');
const IMAGES = require('../../images');

const COMPANY_NAME = 'The Dressery Store';

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
  GET_IMAGE: 'getImage', // get
};

const ROLES = {
  admin: 0,
  client: 99,
  guest: 999,
};

const ERROR_IMAGE_URL = `https://via.placeholder.com/150?text=Product`;

const PRODUCT_CATEGORIES = [
  {
    value: 0,
    label: 'Верхній одяг',
    img: IMAGES.icons8_t_shirt_96,
    subcategories: [
      { value: 0, label: 'Куртки', img: IMAGES.subcategory_bags, titleTopGroup: 'ТЕПЛИЙ ОДЯГ' },
      { value: 1, label: 'Зимові куртки', img: IMAGES.subcategory_jackets },
      { value: 2, label: 'Худі', img: IMAGES.subcategory_hoodies },
      { value: 3, label: 'Светри', img: IMAGES.subcategory_sweaters },
      { value: 4, label: 'Світшоти', img: IMAGES.subcategory_sweatshirts },
      { value: 5, label: 'Кардигани', img: IMAGES.subcategory_cardigans },
      { value: 6, label: 'Футболки', img: IMAGES.subcategory_t_shirts, titleTopGroup: 'ЛЕГКИЙ ОДЯГ' },
      { value: 7, label: 'Сорочки', img: IMAGES.subcategory_pants },
    ],
  },
  {
    value: 1,
    label: 'Нижній одяг',
    img: IMAGES.icons8_pants_96,
    subcategories: [
      { value: 0, label: 'Штани', img: IMAGES.subcategory_bucket_hats, titleTopGroup: 'ПОВСЯКДЕННИЙ ОДЯГ' },
      { value: 1, label: 'Джинси', img: IMAGES.subcategory_jeans },
      { value: 2, label: 'Шорти', img: IMAGES.subcategory_shorts, titleTopGroup: 'ЛЕГКИЙ ЛІТНІЙ ОДЯГ' },
    ],
  },
  {
    value: 2,
    label: 'Взуття',
    img: IMAGES.icons8_shoes_96,
    subcategories: [
      { value: 0, label: 'Кросівки', img: IMAGES.subcategory_sneakers, titleTopGroup: 'ВЗУТТЯ' },
      { value: 1, label: 'Кеди', img: IMAGES.subcategory_slippers },
      { value: 2, label: 'Тапки', img: IMAGES.subcategory_sunglasses, titleTopGroup: 'ЛІТНЄ ВЗУТТЯ' },
    ],
  },
  {
    value: 3,
    label: 'Аксесуари',
    img: IMAGES.icons8_cap_96,
    subcategories: [
      { value: 0, label: 'Кепки', img: IMAGES.subcategory_caps, titleTopGroup: 'ГОЛОВНІ УБОРИ' },
      { value: 1, label: 'Панами', img: IMAGES.subcategory_bucket_hats },
      { value: 2, label: 'Шапки', img: IMAGES.subcategory_hats },
      { value: 3, label: 'Сонцезахисні окуляри', img: IMAGES.subcategory_bags, titleTopGroup: 'ОКУЛЯРИ' },
      { value: 4, label: 'Сумки', img: IMAGES.subcategory_bags, titleTopGroup: 'СУМКИ' },
    ],
  },
];

const PRODUCT_SUBCATEGORIES = PRODUCT_CATEGORIES.flatMap((category, categoryIndex) =>
  category.subcategories.map((subcategory) => ({
    categoryIndex,
    ...subcategory,
  })),
);

const NAME_SELECT = {
  ACCOUNT: 'Акаунт',
  WISHLIST: 'Список бажань',
  BASKETLIST: 'Кошик',
};

const ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];

const TEXT_LINK_STEP = { MAIN: 'ГОЛОВНА', SHOP: 'МАГАЗИН', DEFAULT: 'ОДЯГ' };

const SCREEN_SIZES = {
  MOBILE_MAX: 768,
  TABLET_MAX: 1024,
};

module.exports = {
  COMPANY_NAME,
  WORKING_HOURS,
  WORKING_DAYS,
  ACCESS_TOKEN,
  HTTP_METHODS,
  ROLES,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  NAME_SELECT,
  ERROR_IMAGE_URL,
  ACTION,
  SIZE_OPTIONS,
  TEXT_LINK_STEP,
  SCREEN_SIZES,
};
