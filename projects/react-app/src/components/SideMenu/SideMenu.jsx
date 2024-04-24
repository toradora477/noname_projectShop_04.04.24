import React, { useState } from 'react';

import { icons8_t_shirt_96, icons8_shoes_96, icons8_pants_96, icons8_like_96, icons8_cap_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';
import clsx from 'clsx';
import './SideMenu.scss';

const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ButtomSideMenu = ({ src, text = 'верхній одяг' }) => {
    return (
      <button className="btn-first">
        <img src={src} alt="btn menu" />
        {isExpanded && <span className="text">{text}</span>}
      </button>
    );
  };

  return (
    <nav
      className={clsx('side-menu', {
        expanded: isExpanded,
      })}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="container">
        <br />
        <ButtomSideMenu src={Icon_menu_sidemenu} />
        <ButtomSideMenu src={icons8_bag_96} />
        <ButtomSideMenu src={icons8_t_shirt_96} />
        <ButtomSideMenu src={icons8_pants_96} />
        <ButtomSideMenu src={icons8_shoes_96} />
        <ButtomSideMenu src={icons8_cap_96} />
        <ButtomSideMenu src={icons8_like_96} />
      </div>
    </nav>
  );
};

export default SideMenu;
