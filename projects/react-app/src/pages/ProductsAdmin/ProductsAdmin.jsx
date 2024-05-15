import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../../store/commonReducer';
import ReactPaginate from 'react-paginate';
import './ProductsAdmin.scss';

import { PrimaryButton, Product } from '../../components';
import { PRODUCT_ADD } from '../../common_constants/modals';

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.common.products) ?? [];
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 15; // Количество продуктов на странице

  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentProducts = products.slice(offset, offset + productsPerPage);

  const onBtnClickAddProduct = () => {
    dispatch(setModal({ name: PRODUCT_ADD }));
  };

  return (
    <div className="products-admin">
      <PrimaryButton onClick={onBtnClickAddProduct} children="Додати новий продукт" className="products-btn-add" />
      <br />
      <div className="product-list">
        {currentProducts.map((item) => (
          // <ProductAdminItem key={item._id} item={item} />
          <Product key={item._id} item={item} />
        ))}
      </div>
      <br />
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
