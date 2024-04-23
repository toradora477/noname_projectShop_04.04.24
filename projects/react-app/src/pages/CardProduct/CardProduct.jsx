import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import './CardProduct.scss';
import { Card, Typography } from '../../components';

const CardProduct = () => {
  const { productId } = useParams();
  const history = useHistory();

  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  if (!item) {
    history.push(ROUTES.ERROR404);
    return null;
  }

  const text1 = 'ГОЛОВНА'; // ? постійна
  const text2 = 'МАГАЗИН'; // ? постійна
  const text3 = 'ОДЯГ'; // TODO динамічною повина бути
  const text4 = 'ФУТБОЛКИ'; // TODO динамічною повина бути

  // const textLink = `${text1} >> ${text2} >> ${text3} >> <b>${text4}</b>`;
  const textLink = (
    <Typography>
      {text1} &gt;&gt; {text2} &gt;&gt; {text3} &gt;&gt; <b>{text4}</b>
    </Typography>
  );

  return (
    <div className="products-admin">
      <br />
      Інфо товару
      <br />
      <Card pl={35}>
        {textLink} <br />
        <Typography mt={8} children={item.name} />
        <Typography mt={8}>3 відгуки</Typography>
        <Typography mt={8} children={item.price} />
        <Typography mt={8}>Розмір</Typography>
        <Typography mt={8}>Колір</Typography>
        <Typography mt={8}>Додати до списку бажань</Typography>
        <Typography mt={8}>Поділитися</Typography>
      </Card>
      <br />
    </div>
  );
};

export default CardProduct;
