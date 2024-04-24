import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common_constants/routes';
import { PrimaryButton } from '../';

import './MenuAdmin.scss';

const MenuAdmin = () => {
  return (
    <header className="menu-admin">
      <Link className="menu-admin-btn" to={ROUTES.ORDER_ADMIN}>
        <PrimaryButton children="Замовлення" color="blue" />
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.PRODUCTS_ADMIN}>
        <PrimaryButton children="Товари" color="blue" />
      </Link>
      <Link className="menu-admin-btn" to={ROUTES.STATISTICS_ADMIN}>
        <PrimaryButton children="Статистика" color="blue" />
      </Link>
    </header>
  );
};

export default MenuAdmin;
