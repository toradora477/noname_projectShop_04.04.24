import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import './CardProduct.scss';
import { Card } from '../../components';

const CardProduct = () => {
  const { productId } = useParams();
  const history = useHistory();

  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  if (!item) {
    history.push(ROUTES.ERROR404);
    return null;
  }

  return (
    <div className="products-admin">
      <br />
      Інфо товару
      <br />
      <Card pl={35}>
        {item._id}
        <br />
        {item.i} <br />
        {item.imageUrl} <br />
        {item.name} <br />
        {item.price}
      </Card>
      <br />
    </div>
  );
};

export default CardProduct;
