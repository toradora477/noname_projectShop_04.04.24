import React from 'react';

import { icons8_t_shirt_96, icons8_shoes_96, icons8_pants_96, icons8_like_96, icons8_cap_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';

import './SideMenu.scss';

const SideMenu = () => {
  const ButtomSideMenu = ({ src }) => {
    return (
      <button className="btn-first">
        <img src={src} alt="btn menu" />
      </button>
    );
  };

  return (
    <nav className="side-menu">
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
