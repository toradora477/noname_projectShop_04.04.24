import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addBasket, deleteProduct, removeBasket } from '../../store/commonReducer';
import { Link, useLocation } from 'react-router-dom';

// import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import { request } from '../../tools';
import { ROUTES } from '../../common_constants/routes';
import { icon_heart_empty_red, icon_heart_empty_gray, img_test_murder } from '../../images';
import { Spin } from '../';
import './Product.scss';

import { PrimaryButton } from '../';

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(false);

  const isPagePersonalOffice = pathname === ROUTES.PERSONAL_OFFICE;
  const isPageProductAdmin = pathname === ROUTES.PRODUCTS_ADMIN;
  const isLikeProduct = item.likeProduct ? icon_heart_empty_red : icon_heart_empty_gray;
  const validImageProduct = img_test_murder ?? item.imageUrl; // TODO тестове
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

  const handleLikeProduct = () => {
    console.log(item._id);
  };

  const onBtnClickRemoveProduct = async () => {
    setLoading(true);

    await request.delete('/products/', item._id, (res) => {
      console.log('Товар успішно додано', res);
      // if (res?.data) dispatch(addProduct(res.data));
      // dispatch(setModal());
      console.log(res.data);
      dispatch(deleteProduct(res.data));
    });

    setLoading(false);
  };

  const productEditing = (
    <Fragment>
      {/* <PrimaryButton color="blue" children="Додаткова інформація" /> */}
      {/* <PrimaryButton mt={8} color="orange" children="Редагувати" /> */}
      <PrimaryButton mt={8} color="red" children="Видалити" onClick={onBtnClickRemoveProduct} />
    </Fragment>
  );

  const removeItemsBasket = <PrimaryButton className="danger" mt={8} children="ВИДАЛИТИ ОДИН" onClick={onDelInBasket} />;

  return (
    <div className="product">
      <Spin spinning={loading}>
        {!isPageProductAdmin && (
          <button className="btn-first product-like-icon" onClick={handleLikeProduct}>
            <img src={isLikeProduct} alt="btn menu" />
          </button>
        )}
        <Link className="menu-admin-btn" to={`${ROUTES.CARD_PRODUCT}/${item._id}`}>
          <img src={validImageProduct} alt="product" className="product-main-image" />
        </Link>
        <h3>{item.n}</h3>
        <p>${item.p}</p>
        {!isPageProductAdmin && <PrimaryButton children={textAddBtnDynamic} onClick={onPutInBasket} />}
        {isPagePersonalOffice && removeItemsBasket}
        {isPageProductAdmin && productEditing}
      </Spin>
    </div>
  );
};

export default Product;
