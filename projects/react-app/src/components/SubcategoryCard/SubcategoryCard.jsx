import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../common_constants/routes';
import { subcategory_jackets } from '../../images';
import './SubcategoryCard.scss';

const SubcategoryCard = ({ item }) => {
  return (
    <div className="subcategory-card">
      <Link
        to={{
          pathname: `${ROUTES.SHOP}`,
          search: `?category=${item.categoryIndex}&subcategory=${item.value}`,
        }}
      >
        <div className="subcategory-label">{item.label}</div>
        <img src={item.img ?? subcategory_jackets} alt="subCategory" className="subcategory-image" />
      </Link>
    </div>
  );
};

export default SubcategoryCard;
