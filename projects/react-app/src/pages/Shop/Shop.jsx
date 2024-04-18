import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Product } from '../../components';
import { billboardHomeDashboard } from '../../images';
import './Shop.scss';

const Shop = () => {
  const products = useSelector((state) => state.common.products) ?? [];
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 15; // Количество продуктов на странице

  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="shop-page">
      <img src={billboardHomeDashboard} alt="billboard" />
      <div className="product-list">
        {currentProducts.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={currentPage === 0 ? '' : '<'}
        nextLabel={currentPage === pageCount - 1 ? '' : '>'}
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
