import React, { Fragment, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import { addFavoriteProduct, addBasket, removeFavoriteProduct } from '../../store/commonReducer';
import './CardProduct.scss';
import { Card, Typography, FlexBox, PrimaryButton, Spin, SizeSquare, ColorSquare } from '../../components';
import { ACTION } from '../../common_constants/business';
import GroupImage from './GroupImage';
import { request } from '../../tools';

import { SketchPicker } from 'react-color';

const ColorPicker = ({ initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    if (onChange) {
      onChange(color.hex);
    }
  };

  return (
    <div>
      <div
        style={{
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          backgroundColor: color,
          border: '1px solid #000',
          cursor: 'pointer',
        }}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onClick={() => setShowPicker(false)}
          />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      )}
    </div>
  );
};

const CardProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const [loadingAddBasket, setLoadingAddBasket] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);
  const [loadingPutWishList, setLoadingPutWishList] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#1890ff');

  const { isClient } = useSelector((state) => state.common.accessRoles);

  const products = useSelector((state) => state.common.products) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);

  // const item = products.find((item) => item._id === productId);
  // if (item) {
  //   item.isFavorite = userAuth?.fav?.includes(item._id) ?? false;
  // }

  // Добавляем свойство isFavorite ко всем продуктам
  const productsWithFavoriteStatus = products.map((product) => ({
    ...product,
    isFavorite: userAuth?.fav?.includes(product._id) ?? false,
  }));

  // Находим нужный продукт с уже обновленным свойством isFavorite
  const item = productsWithFavoriteStatus.find((item) => item._id === productId);

  //  const productsWithFavoriteStatus = products.map((product) => ({
  //    ...product,
  //    isFavorite: userAuth?.fav?.includes(product._id) ?? false,
  //  }));

  console.log('item', item);

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
      <SizeSquare />
    </Fragment>
  );
  const colorProduct = (
    <Fragment>
      <Text mt={8}>Колір:&nbsp;</Text>
      <ColorSquare />
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

    handleToFavorites(
      item._id,

      // item.isFavorite ? ACTION.ADD : ACTION.REMOVE,
      ACTION[item.isFavorite ? 'REMOVE' : 'ADD'],
    );
    // handleToFavorites(item._id, ACTION.REMOVE);
    setLoadingPutWishList(false);
  };

  async function handleToFavorites(productId, action) {
    const data = { productId, action: action };

    await request.patch(
      '/clients/changeFavorites',
      data,
      (response) => {
        console.log('Added to favorites:', response);
        if (action === ACTION.ADD) dispatch(addFavoriteProduct(productId));
        else if (action === ACTION.REMOVE) dispatch(removeFavoriteProduct(productId));
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

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  return (
    <div className="card-product">
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
          {isClient && (
            <Spin spinning={loadingPutWishList}>
              <button className="btn-no-border" onClick={onPutWishList}>
                <BtnText>Додати до списку бажань {item.isFavorite ? '(так)' : '(ні)'}</BtnText>
              </button>
            </Spin>
          )}
          <div style={{ padding: '20px' }}>
            <h1>Custom Color Picker</h1>
            <ColorPicker initialColor={selectedColor} onChange={handleColorChange} />
            <p>Selected Color: {selectedColor}</p>
          </div>
        </Card>
      </FlexBox>
      <br />
    </div>
  );
};

export default CardProduct;
