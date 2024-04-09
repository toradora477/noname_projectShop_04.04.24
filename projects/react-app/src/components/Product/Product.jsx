import React from 'react';
import './Product.scss';

const Product = ({ name, price, imageUrl }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt="product-image" />
      <h3>{name}</h3>
      <p>${price}</p>
      <button>
        <span className="product-text-btn">Add to Cart</span>
      </button>
    </div>
  );
};

export default Product;
