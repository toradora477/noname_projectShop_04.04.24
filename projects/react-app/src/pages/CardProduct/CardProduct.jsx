import React, { Fragment, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import { addBasket } from '../../store/commonReducer';
import './CardProduct.scss';
import { Card, Typography, FlexBox, PrimaryButton, Spin } from '../../components';
import { ACTION } from '../../common_constants/business';
import GroupImage from './GroupImage';
import { request } from '../../tools';

const CardProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const [loadingAddBasket, setLoadingAddBasket] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);
  const [loadingPutWishList, setLoadingPutWishList] = useState(false);

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

  const [LinkText, TItle, Text, BtnText] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={10} fw={700} />,
    ({ children, mt }) => <Typography children={children} mt={mt} sz={16} fw={400} />,
    ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={600} />,
    ({ children, mt }) => <Typography children={children} mt={mt} sz={12} fw={600} />,
  ];

  const linkTypeText = (
    <LinkText>
      {text1} &gt;&gt; {text2} &gt;&gt; {text3} &gt;&gt; <b>{text4}</b>
    </LinkText>
  );
  const nameProduct = <TItle children={item.n} mt={8} />;
  const priceProduct = <Text mt={8}>{item.p}&nbsp;₴</Text>;
  const sizeProduct = (
    <Fragment>
      <Text mt={8}>Розмір:&nbsp;</Text>
    </Fragment>
  );
  const colorProduct = (
    <Fragment>
      <Text mt={8}>Колір:&nbsp;</Text>
    </Fragment>
  );

  // console.log(item);

  const onBuyNow = () => {
    setLoadingBuyNow(true);
    console.log('Buy Now');
    setLoadingBuyNow(false);
  };

  const onPutBasket = () => {
    setLoadingAddBasket(true);
    dispatch(addBasket(item._id));
    setLoadingAddBasket(false);
  };

  const onPutWishList = () => {
    setLoadingPutWishList(true);
    console.log('on Put Wish List');
    handleToFavorites(item._id, ACTION.ADD);
    handleToFavorites(item._id, ACTION.REMOVE);
    setLoadingPutWishList(false);
  };

  async function handleToFavorites(productId, action) {
    const data = { productId, action: action };

    await request.patch(
      '/clients/changeFavorites',
      data,
      (response) => {
        console.log('Added to favorites:', response);
      },
      (error) => {
        console.error('Error adding to favorites:', error);
      },
    );
  }

  // const registerRequest = () => {
  //   const body = {
  //     productId: item._id,
  //   };

  //   request.post('/auth/clientRegistration', body, (res) => {
  //     if (res.exists) return setExistsClient(true);

  //     window.localStorage.setItem('accessToken', res.accessToken);
  //     setExistsClient(null);

  //     dispatch(setUserAuth(getTokenData(res.accessToken)));
  //     dispatch(setModal());
  //   });
  // };

  return (
    <div className="card-product">
      <br />
      Інфо товару
      <FlexBox>
        <GroupImage />
        <Card pl={35}>
          {linkTypeText}
          {nameProduct}
          {priceProduct}
          {sizeProduct}
          {colorProduct}

          <Spin spinning={loadingBuyNow}>
            <PrimaryButton mt={8} children="Купити зараз" onClick={onBuyNow} />
          </Spin>
          <Spin spinning={loadingAddBasket}>
            <PrimaryButton className="primary" mt={8} children="Додати в кошик" onClick={onPutBasket} />
          </Spin>
          <Spin spinning={loadingPutWishList}>
            <button className="btn-no-border" onClick={onPutWishList}>
              <BtnText>Додати до списку бажань</BtnText>
            </button>
          </Spin>
        </Card>
      </FlexBox>
      <br />
    </div>
  );
};

export default CardProduct;
