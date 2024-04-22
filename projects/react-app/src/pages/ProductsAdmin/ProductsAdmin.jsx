import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './ProductsAdmin.scss';
import { Product } from '../../components';

const ProductsAdmin = () => {
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
    <div className="products-admin">
      <div className="product-list">
        {currentProducts.map((item) => (
          <Product key={item._id} item={item} />
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

export default ProductsAdmin;