import React, { useState, Fragment } from 'react';
import { icons8_like_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';
import { PRODUCT_CATEGORIES } from '../../common_constants/business';
import clsx from 'clsx';
import './SideMenu.scss';

const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ButtomSideMenu = ({ item, src, text, ml = 10 }) => {
    return (
      <button style={{ marginLeft: ml }} className="btn-first">
        <img src={src ?? item?.img} alt="btn menu" />
        {isExpanded && <span className="text">{text ?? item?.label}</span>}
      </button>
    );
  };

  return (
    <Fragment>
      <div className="side-block" />
      <nav
        className={clsx('side-menu', {
          expanded: isExpanded,
        })}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="container">
          <br />
          <ButtomSideMenu ml={0} src={Icon_menu_sidemenu} text="Меню" />
          <ButtomSideMenu src={icons8_bag_96} text="Магазин" />
          {PRODUCT_CATEGORIES.map((item, index) => (
            <ButtomSideMenu item={item} key={index} />
          ))}
          <ButtomSideMenu src={icons8_like_96} text="Лідери продажів" />
        </div>
      </nav>
    </Fragment>
  );
};

export default SideMenu;
