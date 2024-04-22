import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';

import './MenuAdmin.scss';

const MenuAdmin = () => {
  return (
    <header className="menu-admin">
      <Link className="menu-admin-btn" to={ROUTES.PAGE_ADMIN_ORDER}>
        <button>Замовлення</button>
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.PAGE_ADMIN_PRODUCTS}>
        <button>Товари</button>
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.PAGE_ADMIN_STATISTICS}>
        <button>Статистика</button>
      </Link>
    </header>
  );
};

export default MenuAdmin;
