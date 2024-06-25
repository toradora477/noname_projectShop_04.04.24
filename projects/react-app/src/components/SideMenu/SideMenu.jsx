import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { icons8_like_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';
import { PRODUCT_CATEGORIES } from '../../common_constants/business';
import clsx from 'clsx';
import { ROUTES } from '../../common_constants/routes';
import './SideMenu.scss';

const ButtonWithIcon = ({ src, text, isExpanded, item, ml = 10, pathnameLink, handleMouseEnterSecondLevel, handleMouseLeaveSecondLevel }) => {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={{
        pathname: pathnameLink ?? ROUTES.SHOP,
        ...(pathnameLink ? {} : { search: `?category=${item?.value}` }),
      }}
      onMouseEnter={(e) => handleMouseEnterSecondLevel(e, text ?? item?.label)}
      onMouseLeave={(e) => handleMouseLeaveSecondLevel(e)}
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
  const { isMobileScreen, isTabletScreen } = useSelector((state) => state.screenSize.deviceType);

  const [isExpandedFirstLevel, setIsExpandedFirstLevel] = useState(false);
  const [isExpandedSecondLevel, setIsExpandedSecondLevel] = useState(false);
  const [firstLevelAnimationComplete, setFirstLevelAnimationComplete] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    if (isExpandedFirstLevel) {
      const timer = setTimeout(() => {
        setFirstLevelAnimationComplete(true);
      }, 300); // 300ms - это время анимации для первого уровня
      return () => clearTimeout(timer);
    } else {
      setFirstLevelAnimationComplete(false);
    }
  }, [isExpandedFirstLevel]);

  if (isTabletScreen || isMobileScreen) return null;

  const handleMouseEnterFirstLevel = () => {
    setIsExpandedFirstLevel(true);
  };

  const handleMouseLeaveFirstLevel = () => {
    setIsExpandedFirstLevel(false);
    setIsExpandedSecondLevel(false);
    setActiveButton(null);
  };

  const handleMouseEnterSecondLevel = (event, buttonLabel) => {
    if (firstLevelAnimationComplete) {
      setIsExpandedSecondLevel(true);
      setActiveButton(buttonLabel);
    }
  };

  const handleMouseLeaveSecondLevel = () => {
    setIsExpandedSecondLevel(false);
    setActiveButton(null);
  };

  return (
    <Fragment>
      <div className="side-block" />
      <div className={clsx('side-screen-dim', { visible: isExpandedFirstLevel })} />

      <nav
        className={clsx('side-menu', {
          'first-level-expanded': isExpandedFirstLevel,
        })}
        onMouseEnter={handleMouseEnterFirstLevel}
        onMouseLeave={handleMouseLeaveFirstLevel}
      >
        <div className="container">
          <br />
          <ButtonWithIcon
            pathnameLink={ROUTES.HOME_DASHBOARD}
            ml={0}
            src={Icon_menu_sidemenu}
            text="Меню"
            isExpanded={isExpandedFirstLevel}
            handleMouseEnterSecondLevel={handleMouseEnterSecondLevel}
            handleMouseLeaveSecondLevel={handleMouseLeaveSecondLevel}
          />
          <ButtonWithIcon
            pathnameLink={ROUTES.SHOP}
            src={icons8_bag_96}
            text="Магазин"
            isExpanded={isExpandedFirstLevel}
            handleMouseEnterSecondLevel={handleMouseEnterSecondLevel}
            handleMouseLeaveSecondLevel={handleMouseLeaveSecondLevel}
          />
          {PRODUCT_CATEGORIES.map((item, index) => (
            <ButtonWithIcon
              item={item}
              key={index}
              isExpanded={isExpandedFirstLevel}
              handleMouseEnterSecondLevel={handleMouseEnterSecondLevel}
              handleMouseLeaveSecondLevel={handleMouseLeaveSecondLevel}
            />
          ))}
          <ButtonWithIcon
            pathnameLink={ROUTES.SHOP}
            src={icons8_like_96}
            text="Лідери продажів"
            isExpanded={isExpandedFirstLevel}
            handleMouseEnterSecondLevel={handleMouseEnterSecondLevel}
            handleMouseLeaveSecondLevel={handleMouseLeaveSecondLevel}
          />
        </div>

        <nav
          className={clsx('side-menu-2', {
            'second-level-expanded': isExpandedSecondLevel,
          })}
          onMouseEnter={handleMouseEnterSecondLevel}
          onMouseLeave={handleMouseLeaveSecondLevel}
        >
          <div className="container">
            <br />
            {/* Здесь можно использовать activeButton для отображения дополнительной информации */}
            {activeButton && <div>Активная кнопка: {activeButton}</div>}
          </div>
        </nav>
      </nav>
    </Fragment>
  );
};

export default SideMenu;
