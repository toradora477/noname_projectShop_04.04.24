const BASE_PATH = '/admin';

const ROUTES = {
  HOME_DASHBOARD: '/',
  SHOP: '/shop',
  AUTH: '/auth',
  ERROR404: '/error404',
  CARD_PRODUCT: '/cardProduct',
  ORDER_ADMIN: `${BASE_PATH}/order`,
  PRODUCTS_ADMIN: `${BASE_PATH}/product`,
  STATISTICS_ADMIN: `${BASE_PATH}/statistics`,
};

module.exports = {
  ROUTES,
};
