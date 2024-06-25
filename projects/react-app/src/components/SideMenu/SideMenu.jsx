import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { icons8_like_96, icons8_bag_96, Icon_menu_sidemenu } from '../../images';
import { PRODUCT_CATEGORIES } from '../../common_constants/business';
import clsx from 'clsx';
import { ROUTES } from '../../common_constants/routes';
import { Typography } from '../';
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

const ButtonSecond = ({ item }) => {
  const [TItle, Text] = [
    ({ children, mt }) => <Typography children={children} mt={mt} mb={30} ml={10} sz={16} fw={400} />,
    ({ children, mt }) => <Typography children={children} mt={mt} sz={16} fw={400} color="dark_gray" />,
  ];

  return (
    <Fragment>
      {item.titleTopGroup && <TItle children={item?.titleTopGroup ?? ''} />}
      <Link
        style={{ textDecoration: 'none' }}
        to={{
          pathname: ROUTES.SHOP,
          search: `?category=${item?.category}&subcategory=${item.value}`,
        }}
      >
        <button style={{ marginLeft: 10 }} className="btn-first">
          <Text children={item?.label ?? ''} />
        </button>
      </Link>
    </Fragment>
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

  const handleMouseLeaveSecondLevel = () => {
    setIsExpandedSecondLevel(false);
  }; // Не сбрасываем activeButton здесь, чтобы он оставался активным, пока курсор находится внутри side-menu-2

  const handleMouseLeaveFirstLevel = () => {
    if (!isExpandedSecondLevel) {
      setIsExpandedFirstLevel(false);
      setActiveButton(null);
    }
  }; // Добавляем проверку, чтобы не сбрасывать activeButton при наличии раскрытого второго уровня

  const handleMouseEnterSecondLevel = (event, buttonLabel) => {
    const isLabelInCategories = PRODUCT_CATEGORIES?.find((item) => buttonLabel === item.label) ? buttonLabel : null;
    if (firstLevelAnimationComplete && isLabelInCategories) {
      setIsExpandedSecondLevel(true);
      setActiveButton(isLabelInCategories);
    }
  };

  const listSubcategories = activeButton
    ? PRODUCT_CATEGORIES?.find((item) => activeButton === item.label)?.subcategories?.map((sub) => ({
        ...sub,
        category: PRODUCT_CATEGORIES?.find((item) => activeButton === item.label)?.value,
      }))
    : [];

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
          onMouseEnter={() => setIsExpandedSecondLevel(true)}
          onMouseLeave={handleMouseLeaveSecondLevel}
        >
          <div style={{ marginTop: '49px' }} className="container">
            {activeButton && listSubcategories && listSubcategories.map((item, index) => <ButtonSecond item={item} key={index} />)}
          </div>
        </nav>
      </nav>
    </Fragment>
  );
};

export default SideMenu;
