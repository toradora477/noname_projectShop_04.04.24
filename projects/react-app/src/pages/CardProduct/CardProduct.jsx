import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import { addFavoriteProduct, addBasket, removeBasket, removeFavoriteProduct, setModal } from '../../store/commonReducer';
import './CardProduct.scss';
import { Card, Typography, FlexBox, PrimaryButton, Spin, QuantitySelector, SelectSquare } from '../../components';
import { ACTION, TEXT_LINK_STEP } from '../../common_constants/business';
import GroupImage from './GroupImage';
import { request, retrieveCategoryAndSubcategoryLabels } from '../../tools';
import { PLACING_AN_ORDER } from '../../common_constants/modals';
import { icon_heart_empty_black, icon_heart_empty_red } from '../../images';

const CardProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const [loadingAddBasket, setLoadingAddBasket] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);
  const [loadingPutWishList, setLoadingPutWishList] = useState(false);

  const { isClient } = useSelector((state) => state.common.accessRoles);
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  if (!item) {
    history.push(ROUTES.ERROR404);
    return null;
  }

  const resultLabelCategory = retrieveCategoryAndSubcategoryLabels(item.c?.[0], item.c?.[1]);

  const text1 = TEXT_LINK_STEP.MAIN;
  const text2 = TEXT_LINK_STEP.SHOP;
  const text3 = typeof resultLabelCategory.categoryLabel === 'string' ? resultLabelCategory.categoryLabel.toUpperCase() : TEXT_LINK_STEP.DEFAULT;
  const text4 =
    typeof resultLabelCategory.subcategoryLabel === 'string' ? resultLabelCategory.subcategoryLabel.toUpperCase() : TEXT_LINK_STEP.DEFAULT;

  const [LinkText, TItle, Label, BtnText] = [
    ({ children, mt }) => <Typography children={children} mt={mt} sz={10} fw={400} />,
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
  const priceProduct = <Label mt={8}>{item.p}&nbsp;₴</Label>;

  const sizesProduct = item?.s ?? [];
  const colorsProduct = item?.f?.map((i) => (i = i.color)) ?? [];

  const onSelectSize = (index) => {
    console.log(index.text);
  };

  const onSelectColor = (index) => {
    console.log(index.color);
  };

  const onClickAddOrder = () => {
    setLoadingBuyNow(true);
    dispatch(addBasket(item._id));
    dispatch(setModal({ name: PLACING_AN_ORDER }));
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

      ACTION[item.isFavorite ? 'REMOVE' : 'ADD'],
    );

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

  const onPutInBasket = () => {
    dispatch(addBasket(item._id));
  };

  const onDelInBasket = () => {
    dispatch(removeBasket(item._id));
  };

  const productCounts = basket.reduce((counts, productId) => {
    counts[productId] = (counts[productId] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className="card-product">
      <FlexBox>
        <GroupImage />
        <Card ml={20} pl={35}>
          {linkTypeText}
          {nameProduct}
          {priceProduct}
          <FlexBox mt={8}>
            <Label>Розмір:&nbsp;</Label>
            <SelectSquare mr={8} optionsText={sizesProduct} onSelect={onSelectSize} />
          </FlexBox>
          <FlexBox mt={8}>
            <Label>Колір:&nbsp;</Label>
            <SelectSquare mr={8} optionsColor={colorsProduct} onSelect={onSelectColor} />
          </FlexBox>
          <Spin spinning={loadingAddBasket}>
            <FlexBox mt={8}>
              <QuantitySelector quantity={productCounts[item._id] ?? 0} onDecrease={onDelInBasket} onIncrease={onPutInBasket} />
              <PrimaryButton style={{ width: 190 }} ml={14} children={<BtnText children="Додати в кошик" />} onClick={onPutBasket} />
            </FlexBox>
          </Spin>
          <Spin spinning={loadingBuyNow}>
            <PrimaryButton
              style={{ width: 264 }}
              className="primary"
              mt={8}
              children={<BtnText children="Купити зараз" />}
              onClick={onClickAddOrder}
            />
          </Spin>

          {isClient && (
            <Spin spinning={loadingPutWishList}>
              <FlexBox mt={8}>
                <img src={item.isFavorite ? icon_heart_empty_red : icon_heart_empty_black} alt="btn-like" />
                &nbsp;
                <button className="btn-no-border" onClick={onPutWishList}>
                  <BtnText>Додати до списку бажань </BtnText>
                </button>
              </FlexBox>
            </Spin>
          )}
        </Card>
      </FlexBox>
    </div>
  );
};

export default CardProduct;
