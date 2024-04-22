import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';

import './MenuAdmin.scss';

const MenuAdmin = () => {
  return (
    <header className="menu-admin">
      <Link className="menu-admin-btn" to={ROUTES.ORDER_ADMIN}>
        <button>Замовлення</button>
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.PRODUCTS_ADMIN}>
        <button>Товари</button>
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.STATISTICS_ADMIN}>
        <button>Статистика</button>
      </Link>
    </header>
  );
};

export default MenuAdmin;
