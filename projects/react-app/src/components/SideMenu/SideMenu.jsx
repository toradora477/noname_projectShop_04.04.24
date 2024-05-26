import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { icons8_like_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';
import { PRODUCT_CATEGORIES } from '../../common_constants/business';
import clsx from 'clsx';
import { ROUTES } from '../../common_constants/routes';
import './SideMenu.scss';

const ButtonWithIcon = ({ src, text, isExpanded, item, ml = 10, pathnameLink }) => {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={{
        pathname: pathnameLink ?? ROUTES.SHOP,
        ...(pathnameLink ? {} : { search: `?category=${item?.value}` }),
      }}
    >
      <button style={{ marginLeft: ml }} className="btn-first">
        <img src={src ?? item?.img} alt="btn menu" />
        {isExpanded && (
          <span className="text" style={{ fontWeight: 700, fontSize: '16px' }}>
            {text ?? item?.label}
          </span>
        )}
      </button>
    </Link>
  );
};

const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <Fragment>
      <div className="side-block" />
      <div className={clsx('side-screen-dim', { visible: isExpanded })} />
      <nav
        className={clsx('side-menu', {
          expanded: isExpanded,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container">
          <br />
          <ButtonWithIcon pathnameLink={ROUTES.HOME_DASHBOARD} ml={0} src={Icon_menu_sidemenu} text="Меню" isExpanded={isExpanded} />
          <ButtonWithIcon pathnameLink={ROUTES.SHOP} src={icons8_bag_96} text="Магазин" isExpanded={isExpanded} />
          {PRODUCT_CATEGORIES.map((item, index) => (
            <ButtonWithIcon item={item} key={index} isExpanded={isExpanded} />
          ))}
          <ButtonWithIcon pathnameLink={ROUTES.SHOP} src={icons8_like_96} text="Лідери продажів" isExpanded={isExpanded} />
        </div>
      </nav>
    </Fragment>
  );
};

export default SideMenu;
