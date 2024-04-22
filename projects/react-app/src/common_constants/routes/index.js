const BASE_PATH = '/pageAdmin';

const ROUTES = {
  HOME_DASHBOARD: '/',
  SHOP: '/shop',
  AUTH: '/auth',
  ERROR404: '/error404',
  PAGE_ADMIN_ORDER: `${BASE_PATH}/order`,
  PAGE_ADMIN_PRODUCTS: `${BASE_PATH}/product`,
  PAGE_ADMIN_STATISTICS: `${BASE_PATH}/statistics`,
};

module.exports = {
  ROUTES,
};
