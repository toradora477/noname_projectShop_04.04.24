import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addFavoriteProduct, addBasket, removeFavoriteProduct, deleteProduct, removeBasket, setModal } from '../../store/commonReducer';

import { AUTH } from '../../common_constants/modals';
import { ROUTES } from '../../common_constants/routes';
import { ACTION } from '../../common_constants/business';

import { request } from '../../tools';
import { icon_heart_empty_red, icon_heart_empty_gray } from '../../images';
import { Spin, PreviewImage, PrimaryButton, Typography } from '../';

import './Product.scss';

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isGuest, isNotAdmin, isClientOrLower } = useSelector((state) => state.common.accessRoles);

  const [loadingPutWishList, setLoadingPutWishList] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPagePersonalOffice = pathname === ROUTES.PERSONAL_OFFICE;
  const isPageProductAdmin = pathname === ROUTES.PRODUCTS_ADMIN;
  const isLikeProduct = item.isFavorite ? icon_heart_empty_red : icon_heart_empty_gray;

  const textAddBtnDynamic = isPagePersonalOffice ? 'ДОДАТИ ЩЕ ОДИН' : 'ДОДАТИ В КОШИК';

  const onPutInBasket = () => {
    setLoading(true);
    dispatch(addBasket(item._id));
    setLoading(false);
  };

  const onDelInBasket = () => {
    setLoading(true);
    dispatch(removeBasket(item._id));
    setLoading(false);
  };

  const onBtnClickRemoveProduct = async () => {
    setLoading(true);

    await request.delete('/products/', item._id, (res) => {
      dispatch(deleteProduct(res.data));
    });

    setLoading(false);
  };

  const onBtnClickAuth = () => {
    dispatch(setModal({ name: AUTH }));
  };

  const onPutWishList = () => {
    setLoadingPutWishList(true);
    handleToFavorites(item._id, ACTION[item.isFavorite ? 'REMOVE' : 'ADD']);
    setLoadingPutWishList(false);
  };

  async function handleToFavorites(productId, action) {
    const data = { productId, action: action };

    await request.patch(
      '/clients/changeFavorites',
      data,
      () => {
        if (action === ACTION.ADD) dispatch(addFavoriteProduct(productId));
        else if (action === ACTION.REMOVE) dispatch(removeFavoriteProduct(productId));
      },
      (error) => {
        console.error('Error adding to favorites:', error);
      },
    );
  }

  const productEditing = (
    <Fragment>
      <PrimaryButton mt={8} className="danger" children="Видалити" onClick={onBtnClickRemoveProduct} />
    </Fragment>
  );

  const removeItemsBasket = <PrimaryButton className="danger" mt={8} children="ВИДАЛИТИ ОДИН" onClick={onDelInBasket} />;

  return (
    <div className="product">
      <Spin spinning={loading}>
        {isClientOrLower && !isPageProductAdmin && (
          <Spin spinning={loadingPutWishList}>
            <button className="btn-first product-like-icon" onClick={isGuest ? onBtnClickAuth : onPutWishList}>
              <img src={isLikeProduct} alt="btn menu" />
            </button>
          </Spin>
        )}

        <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
          <PreviewImage fileID={item?.f?.[0]?.files?.[0]} />
        </Link>

        <Typography mt={10} color="gray100" sz={10} fw={400} children={item.n} />
        <Typography mt={10} mb={10} color="gray100" sz={10} fw={600} children={`${item.p} ₴`} />
        {isNotAdmin && !isPageProductAdmin && <PrimaryButton children={textAddBtnDynamic} onClick={onPutInBasket} />}
        {isPagePersonalOffice && removeItemsBasket}
        {isPageProductAdmin && productEditing}
      </Spin>
    </div>
  );
};

export default Product;
