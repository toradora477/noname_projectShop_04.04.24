import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../tools';
import { Modal, PrimaryButton, Typography, PreviewImage, Card, Box, FlexBox } from '../../components';
import { setModal } from '../../store/commonReducer';
import './PlacingAnOrder.scss';

const PlacingAnOrder = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const filteredProducts = products.filter((product) => basket.includes(product._id));

  const [formData, setFormData] = useState({
    contactName: 'Яна Іваненко',
    city: 'Бровари',
    address: '',
    deliveryMethod: 'Самовивіз з Нової Пошти',
    paymentMethod: 'Оплата під час отримання товару',
    recipientName: 'Яна Іваненко',
  });

  const [TItle, TextGroup] = [
    ({ children }) => <Typography children={children} fs={24} fw={400} />,
    ({ children }) => <Typography children={children} mb={4} fs={14} fw={600} />,
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      products: filteredProducts.map((product) => ({
        productId: product._id,
        quantity: 1, // Припустимо, що кількість 1 для спрощення; змінюйте за потреби
      })),
    };

    request.post('/orders/addOrder', orderData, (res) => {
      console.log('Замовлення успішно оформлене', res);
      dispatch(setModal());
    });
  };

  return (
    <Modal position="center">
      <TItle children=" Оформлення замовлення" />
      <form onSubmit={handleSubmit} className="order-form">
        <FlexBox>
          <Box>
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
              {filteredProducts.map((product) => (
                <Card pl={7} key={product._id} className="product-item">
                  <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]?.files?.[0]} className="product-image" />
                  <div>
                    <Typography>{product.n}</Typography>
                    <Typography>{product.p} ₴</Typography>
                  </div>
                </Card>
              ))}
            </div>

            <div className="section">
              <TextGroup children="Доставка" />
              <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
                <option value="Самовивіз з Нової Пошти">Самовивіз з Нової Пошти</option>
                {/* Додайте більше варіантів за потреби */}
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
                {/* Додайте більше варіантів за потреби */}
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

          <div className="total-section">
            <Card pl={7} className="product-item">
              <TItle children="Разом" />
              <Typography sz={16}>1 товар на суму</Typography>
              <Typography sz={16}>{filteredProducts.reduce((acc, item) => acc + item.p, 0)} ₴</Typography>
              <PrimaryButton type="submit">Замовлення підтверджую</PrimaryButton>
            </Card>
          </div>
        </FlexBox>
      </form>
    </Modal>
  );
};

export default PlacingAnOrder;
