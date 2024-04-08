import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Product from '../../components/Product';
import { PRODUCTS } from '../../common_constants/testDataBase';
import './Shop.scss';

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 15; // Количество продуктов на странице

  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(PRODUCTS.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentProducts = PRODUCTS.slice(offset, offset + productsPerPage);

  return (
    <div className="shop-page">
      <h1>Shop</h1>
      <div className="product-list">
        {currentProducts.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Shop;
