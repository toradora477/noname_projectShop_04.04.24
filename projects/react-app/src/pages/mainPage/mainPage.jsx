import React from 'react';

// Пример компонента товара
const Product = ({ name, price, imageUrl }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt="image product" />
      <h3>{name}</h3>
      <p>${price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

// Компонент странички магазина
const ShopPage = () => {
  // Пример данных о товарах (обычно данные будут приходить из API или хранилища состояния)
  const products = [
    { id: 1, name: 'Product 1', price: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="shop-page">
      <h1>Shop</h1>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
