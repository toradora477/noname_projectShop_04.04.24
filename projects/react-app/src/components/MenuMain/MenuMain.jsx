import React from 'react';
import { Link } from 'react-router-dom';

import './MenuMain.scss';

const MenuMain = () => {
  return (
    <div className="menu-main">
      <div className="company-logo">
        <img src="/path/to/company-logo.png" alt="Company Logo" />
      </div>
      <div className="menu-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="cart-icon">
        <img src="/path/to/cart-icon.png" alt="Shopping Cart" />
      </div>
    </div>
  );
};

export default MenuMain;
