import React from 'react';
import './Product.scss';

const Product = ({ name, price, imageUrl }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt="product-image" />
      <h3>{name}</h3>
      <p>${price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
