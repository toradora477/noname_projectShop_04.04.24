import React, { Fragment, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../common_constants/routes';
import { addFavoriteProduct, addBasket, removeBasket, removeFavoriteProduct, setModal } from '../../store/commonReducer';
import './CardProduct.scss';
import { Card, Typography, FlexBox, PrimaryButton, Spin, SizeSquare, ColorSquare, ColorPicker, QuantitySelector } from '../../components';
import { ACTION, PRODUCT_CATEGORIES } from '../../common_constants/business';
import GroupImage from './GroupImage';
import { request } from '../../tools';
import { PLACING_AN_ORDER } from '../../common_constants/modals';

const CardProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const [loadingAddBasket, setLoadingAddBasket] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);
  const [loadingPutWishList, setLoadingPutWishList] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#1890ff');

  const { isClient } = useSelector((state) => state.common.accessRoles);
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];

  const item = products.find((item) => item._id === productId);

  const getCategoryAndSubcategoryLabel = (categoryValue, subcategoryValue) => {
    const category = PRODUCT_CATEGORIES.find((cat) => cat.value === Number(categoryValue));
    if (!category) return null;

    const subcategory = category.subcategories.find((sub) => sub.value === Number(subcategoryValue));
    if (!subcategory) return null;

    return {
      categoryLabel: category.label,
      subcategoryLabel: subcategory.label,
    };
  };

  if (!item) {
    history.push(ROUTES.ERROR404);
    return null;
  }

  const resultLabelCategory = getCategoryAndSubcategoryLabel(item.c?.[0], item.c?.[1]);

  const text1 = 'ГОЛОВНА'; // ? постійна
  const text2 = 'МАГАЗИН'; // ? постійна
  const text3 = typeof resultLabelCategory.categoryLabel === 'string' ? resultLabelCategory.categoryLabel.toUpperCase() : 'ОДЯГ';
  const text4 = typeof resultLabelCategory.subcategoryLabel === 'string' ? resultLabelCategory.subcategoryLabel.toUpperCase() : 'ОДЯГ';

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
  console.table(item);
  const sizeProduct = (
    <FlexBox>
      <Label mt={8}>Розмір:&nbsp;</Label>
      <SizeSquare />
    </FlexBox>
  );
  const colorProduct = (
    <FlexBox>
      <Label mt={8}>Колір:&nbsp;</Label>
      <ColorSquare />
    </FlexBox>
  );

  // console.log(item);

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

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

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
          {sizeProduct}
          {colorProduct}
          <Spin spinning={loadingAddBasket}>
            <FlexBox>
              <QuantitySelector quantity={productCounts[item._id] ?? 0} onDecrease={onDelInBasket} onIncrease={onPutInBasket} />
              <PrimaryButton style={{ width: 190 }} ml={14} mt={8} children={<BtnText children="Додати в кошик" />} onClick={onPutBasket} />
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
              <button className="btn-no-border" onClick={onPutWishList}>
                <BtnText>Додати до списку бажань {item.isFavorite ? '(так)' : '(ні)'}</BtnText>
              </button>
            </Spin>
          )}
        </Card>
      </FlexBox>
      <br />
      <div className="product-details">
        <h2>ОПИС</h2>
        <p>{item.description}</p>
        <h2>ДОДАТКОВА ІНФОРМАЦІЯ</h2>
        <table>
          <thead>
            <tr>
              <th>Розмір</th>
              <th>Вага</th>
              <th>Ріст</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>55-65</td>
              <td>155-165</td>
            </tr>
            <tr>
              <td>M</td>
              <td>65-75</td>
              <td>165-175</td>
            </tr>
            <tr>
              <td>L</td>
              <td>75-85</td>
              <td>175-185</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>85-95</td>
              <td>185-195</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </div>
  );
};

export default CardProduct;

//  const [LinkText, TItle, Text, BtnText] = [
//    ({ children, mt }) => <Typography children={children} mt={mt} sz={10} fw={700} />,
//    ({ children, mt }) => <Typography children={children} mt={mt} sz={16} fw={400} />,
//    ({ children, mt }) => <Typography children={children} mt={mt} sz={14} fw={600} />,
//    ({ children, mt }) => <Typography children={children} mt={mt} sz={12} fw={600} />,
//  ];

//  const linkTypeText = (
//    <LinkText>
//      {text1} &gt;&gt; {text2} &gt;&gt; {text3} &gt;&gt; <b>{text4}</b>
//    </LinkText>
//  );

//  const nameProduct = <TItle children={item.n} mt={8} />;
//  const priceProduct = <Text mt={8}>{item.p}&nbsp;₴</Text>;
//  const sizeProduct = (
//    <Fragment>
//      <Text mt={8}>Розмір:&nbsp;</Text>
//      <select className="form-select">
//        <option value="S">S</option>
//        <option value="M">M</option>
//        <option value="L">L</option>
//        <option value="XL">XL</option>
//      </select>
//    </Fragment>
//  );

//  const colorProduct = (
//    <Fragment>
//      <Text mt={8}>Колір:&nbsp;</Text>
//      <select className="form-select">
//        <option value="black">Чорний</option>
//        <option value="white">Білий</option>
//      </select>
//    </Fragment>
//  );

//  const onBuyNow = () => {
//    setLoadingBuyNow(true);
//    console.log('Buy Now');
//    setLoadingBuyNow(false);
//  };

//  const onPutBasket = () => {
//    setLoadingAddBasket(true);
//    dispatch(addBasket(item._id));
//    setLoadingAddBasket(false);
//  };

//  const onPutWishList = () => {
//    setLoadingPutWishList(true);
//    handleToFavorites(item._id, ACTION[item.isFavorite ? 'REMOVE' : 'ADD']);
//    setLoadingPutWishList(false);
//  };

//  <div className="product-details">
//       <h2>ОПИС</h2>
//       <p>{item.description}</p>
//       <h2>ДОДАТКОВА ІНФОРМАЦІЯ</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Розмір</th>
//             <th>Вага</th>
//             <th>Ріст</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>S</td>
//             <td>55-65</td>
//             <td>155-165</td>
//           </tr>
//           <tr>
//             <td>M</td>
//             <td>65-75</td>
//             <td>165-175</td>
//           </tr>
//           <tr>
//             <td>L</td>
//             <td>75-85</td>
//             <td>175-185</td>
//           </tr>
//           <tr>
//             <td>XL</td>
//             <td>85-95</td>
//             <td>185-195</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <br />
