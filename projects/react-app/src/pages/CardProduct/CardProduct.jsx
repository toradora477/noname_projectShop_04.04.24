import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './CardProduct.scss';
import { Product } from '../../components';

const CardProduct = () => {
  const [dispatch, history, { productId }] = [useDispatch(), useHistory(), useParams()];

  const products = useSelector((state) => state.common.products) ?? [];
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 15; // Количество продуктов на странице

  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const item = products.find((item) => item._id === productId);

  console.log(item);

  const currentProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="products-admin">
      <br />
      Інфо товару
      <br />
      {item._id}
      <br />
      {item.i} <br />
      {item.imageUrl} <br />
      {item.name} <br />
      {item.price}
      <br />
    </div>
  );
};

export default CardProduct;
