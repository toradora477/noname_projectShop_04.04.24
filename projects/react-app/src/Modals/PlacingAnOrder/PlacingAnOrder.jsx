import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../tools';
import { Modal, PrimaryButton, Typography, PreviewImage, Card, Box, FlexBox, QuantitySelector } from '../../components';
import { setModal, addBasket, removeBasket, cleanBasket } from '../../store/commonReducer';
import './PlacingAnOrder.scss';

const PlacingAnOrder = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];

  const [TItle, TextGroup] = [
    ({ children }) => <Typography children={children} fs={24} fw={400} />,
    ({ children }) => <Typography children={children} mb={4} fs={14} fw={600} />,
  ];

  const [formData, setFormData] = useState({
    contactName: 'Яна Іваненко',
    city: 'Бровари',
    address: '',
    deliveryMethod: 'Самовивіз з Нової Пошти',
    paymentMethod: 'Оплата під час отримання товару',
    recipientName: 'Яна Іваненко',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const productsWithQuantities = filteredProducts.map((product) => ({
    productId: product._id,
    quantity: productCounts[product._id] || 0,
  }));

  const handleQuantityChange = (productId, amount) => {
    const index = basket.indexOf(productId);

    if (index !== -1) {
      if (amount === -1 && productCounts[productId] === 1) {
        dispatch(removeBasket(productId));
      } else if (amount === -1) {
        dispatch(removeBasket(productId));
      } else {
        dispatch(addBasket(productId));
      }
    }
  };

  const newFinishCost =
    filteredProducts
      .map((product) => ({
        price: product.p,
        quantity: productCounts[product._id] || 0,
      }))
      .reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0) ?? 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      products: productsWithQuantities,
    };

    console.log('Order data:', orderData);

    request.post('/orders/addOrder', orderData, (res) => {
      console.log('Замовлення успішно оформлене', res);
      dispatch(cleanBasket());
      dispatch(setModal());
    });
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => basket.includes(product._id));

    const productCounts = basket.reduce((counts, productId) => {
      counts[productId] = (counts[productId] || 0) + 1;
      return counts;
    }, {});

    setFilteredProducts(filteredProducts);
    setProductCounts(productCounts);
  }, [basket, products]);

  return (
    <Modal position="center">
      <TItle children="Оформлення замовлення" />
      <form onSubmit={handleSubmit} className="order-form">
        <FlexBox>
          <Box className="info-sell">
            <div className="section">
              <TextGroup children="Ваші контактні дані" />
              <div className="editable-field">
                <Typography>{formData.contactName}</Typography>
                <button type="button" onClick={() => alert("Змінити ім'я")}>
                  Змінити
                </button>
              </div>
              <div className="editable-field">
                <Typography>{formData.city}</Typography>
                <button type="button" onClick={() => alert('Змінити місто')}>
                  Змінити
                </button>
              </div>
            </div>

            <div className="section">
              <TextGroup children="Замовлення" />
              {filteredProducts?.map((product, index) => (
                <Card pl={7} key={product?._id ?? index} className="product-item">
                  <FlexBox>
                    <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]?.files?.[0]} className="product-image" />
                    <div>
                      <Typography>{product.n}</Typography>
                      <Typography>{product.p} ₴</Typography>
                    </div>
                    <QuantitySelector
                      key={product?._id ?? index}
                      quantity={productCounts[product._id]}
                      onDecrease={() => handleQuantityChange(product._id, -1)}
                      onIncrease={() => handleQuantityChange(product._id, 1)}
                    />
                  </FlexBox>
                </Card>
              ))}
            </div>

            <div className="section">
              <TextGroup children="Доставка" />
              <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
                <option value="Самовивіз з Нової Пошти">Самовивіз з Нової Пошти</option>
              </select>
              <input
                aria-label="address input"
                placeholder="Виберіть відповідну адресу"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="section">
              <TextGroup children="Оплата" />
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                <option value="Оплата під час отримання товару">Оплата під час отримання товару</option>
              </select>
            </div>

            <div className="section">
              <TextGroup children="Отримувач" />
              <div className="editable-field">
                <Typography>{formData.recipientName}</Typography>
                <button type="button" onClick={() => alert("Змінити ім'я отримувача")}>
                  Змінити
                </button>
              </div>
            </div>
          </Box>

          <Card pl={20} className="finished-sell">
            <TItle children="Разом" />
            <br />
            <FlexBox>
              <Typography sz={16}>
                {basket?.length ?? 0} товар{basket?.length > 1 ? 'и' : ''} на суму
              </Typography>
              <Typography sz={16}>{newFinishCost} ₴</Typography> <br />
            </FlexBox>
            <br />
            <FlexBox>
              <Typography sz={16}>Вартість доставки</Typography>
              <Typography sz={16}>за тарифами перевізника</Typography> <br />
            </FlexBox>
            <br />
            <FlexBox>
              <Typography sz={16}>До сплати</Typography>
              <Typography sz={16}>{newFinishCost} ₴</Typography> <br />
            </FlexBox>

            <br />
            <PrimaryButton type="submit">Замовлення підтверджую</PrimaryButton>
            <br />
            <Typography sz={16}>
              Підтверджуючи замовлення, я приймаю умови: положення про обробку і захист персональних даних угоди користувача
            </Typography>
          </Card>
        </FlexBox>
      </form>
    </Modal>
  );
};

export default PlacingAnOrder;
