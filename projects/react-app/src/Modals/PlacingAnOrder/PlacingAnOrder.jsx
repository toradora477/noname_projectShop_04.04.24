import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../tools';
import { Modal, PrimaryButton, Typography, FlexBox, Input, TextArea, PreviewImage, Card } from '../../components';
import { setModal } from '../../store/commonReducer';
import './PlacingAnOrder.scss';

const PlacingAnOrder = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const filteredProducts = products.filter((product) => basket.includes(product._id));

  const [formData, setFormData] = useState({
    contactName: '',
    city: '',
    address: '',
    deliveryMethod: 'Самовивіз з Нової Пошти',
    paymentMethod: 'Оплата під час отримання товару',
    recipientName: '',
  });

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
        quantity: 1, // Assuming quantity is 1 for simplicity; adjust as needed
      })),
    };

    request.post('/orders/addOrder', orderData, (res) => {
      console.log('Order successfully placed', res);
      dispatch(setModal());
    });
  };

  return (
    <Modal position="center">
      <Typography sz={24} fw={700}>
        Оформлення замовлення
      </Typography>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="section">
          <Typography sz={18} fw={600}>
            Ваші контактні дані
          </Typography>
          <input aria-label="name input" label="Ім'я" name="contactName" value={formData.contactName} onChange={handleChange} required />
          <input aria-label="city input" label="Місто" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="section">
          <Typography sz={18} fw={600}>
            Замовлення
          </Typography>
          {filteredProducts.map((product) => {
            console.log(product);

            return (
              <Card pl={7} key={product._id} className="product-item">
                <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]} className="product-image" />
                <div>
                  <Typography>{product.n}</Typography>
                  <Typography>{product.p} ₴</Typography>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="section">
          <Typography sz={18} fw={600}>
            Доставка
          </Typography>
          <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
            <option value="Самовивіз з Нової Пошти">Самовивіз з Нової Пошти</option>
            {/* Add more options as needed */}
          </select>
          <input aria-label="address input" label="Адреса" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="section">
          <Typography sz={18} fw={600}>
            Оплата
          </Typography>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="Оплата під час отримання товару">Оплата під час отримання товару</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="section">
          <Typography sz={18} fw={600}>
            Отримувач
          </Typography>
          <input aria-label="name input" label="Ім'я" name="recipientName" value={formData.recipientName} onChange={handleChange} required />
        </div>

        <PrimaryButton type="submit">Замовлення підтверджую</PrimaryButton>
      </form>
    </Modal>
  );
};

export default PlacingAnOrder;
