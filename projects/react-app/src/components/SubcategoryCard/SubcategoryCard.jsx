import React from 'react';
import './SubcategoryCard.scss'; // Подключаем стили

const SubcategoryCard = ({ label, imageSrc }) => {
  return (
    <div className="subcategory-card">
      <img src={imageSrc} alt="subCategory" className="subcategory-image" />
      <div className="subcategory-label">{label}</div>
    </div>
  );
};

export default SubcategoryCard;
