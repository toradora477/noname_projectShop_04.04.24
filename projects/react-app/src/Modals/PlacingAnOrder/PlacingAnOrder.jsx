import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request, retrieveCategoryAndSubcategoryLabels } from '../../tools';
import { Modal, PrimaryButton, Typography, PreviewImage, Card, Box, FlexBox, QuantitySelector, Divider, RowGroup } from '../../components';
import { setModal, addBasket, removeBasket, cleanBasket } from '../../store/commonReducer';
import './PlacingAnOrder.scss';

const PlacingAnOrder = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);

  const { TextInfo } = RowGroup;

  const [formData, setFormData] = useState({
    city: 'Бровари',
    address: '',
    deliveryMethod: 'Самовивіз з Нової Пошти',
    paymentMethod: 'Оплата під час отримання товару',
    recipientName: 'Яна Іваненко',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const [password, setPassword] = useState(userAuth?.password ?? '');
  const [email, setEmail] = useState(userAuth?.password ?? '');
  const [firstName, setFirstName] = useState(userAuth?.firstName ?? '');
  const [lastName, setLastName] = useState(userAuth?.lastName ?? '');
  const [phoneNumber, setPhoneNumber] = useState(userAuth?.phoneNumber ?? '');
  const [city, setCity] = useState(userAuth?.city ?? '');
  const [region, setRegion] = useState(userAuth?.region ?? '');
  // const [novaPoshtaBranches, setNovaPoshtaBranches] = useState([]);
  // const [selectedNovaPoshtaBranch, setSelectedNovaPoshtaBranch] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const [TItle, TextGroup, Label] = [
    ({ children, mt, mb }) => <Typography children={children} mt={mt} mb={mb} fs={24} fw={400} />,
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 20} mb={mb} fs={14} fw={600} />,
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 0} mb={mb ?? 4} fs={12} fw={600} color="dark_gray" />,
  ];

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

  const InfoRow = ({ leftText, rightText, mt = 0, mb = 0 }) => {
    return (
      <FlexBox mt={mt} mb={mb} style={{ justifyContent: 'space-between' }}>
        <Typography color="gray50" sz={12} fw={500} children={leftText} />
        <Typography sz={14} fw={600} children={rightText} />
      </FlexBox>
    );
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
      <TItle mb={10} children="Оформлення замовлення" />
      <form onSubmit={handleSubmit} className="order-form">
        <FlexBox>
          <Box className="info-sell">
            <TextGroup mb={12} children="Ваші контактні дані" />

            <FlexBox mb={24}>
              <Box className="input-group">
                <Label>Ім'я</Label>
                <input
                  className="order-form-input"
                  placeholder="Ім'я"
                  aria-label="firstName"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Box>
              &nbsp;&nbsp;
              <Box className="input-group">
                <Label>Прізвище</Label>
                <input
                  className="order-form-input"
                  placeholder="Прізвище"
                  aria-label="lastName"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Box>
            </FlexBox>
            <FlexBox mb={24}>
              <Box className="input-group">
                <Label>Номер телефону</Label>
                <input
                  className="order-form-input"
                  placeholder="Номер телефону"
                  aria-label="phoneNumber"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Box>
              &nbsp;&nbsp;
              <Box className="input-group">
                <Label>Email</Label>
                <input
                  className="order-form-input"
                  placeholder="name@example.com"
                  aria-label="email"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Box>
            </FlexBox>

            <Box>
              <TextGroup children="Замовлення" />
              {filteredProducts?.map((product, index) => {
                const resultLabelCategory = retrieveCategoryAndSubcategoryLabels(product.c?.[0], product.c?.[1]);
                console.log(resultLabelCategory);
                return (
                  <Card pl={7} key={product?._id ?? index} className="product-item">
                    <FlexBox>
                      <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]?.files?.[0]} className="product-image" />
                      <RowGroup>
                        <TextInfo label="Назва:" text={product.n} />

                        <TextInfo
                          label="Категорія:"
                          text={`${resultLabelCategory?.categoryLabel ?? ''} / ${resultLabelCategory?.subcategoryLabel ?? ''}`}
                        />
                        <TextInfo label="Ціна:" text={`${product.p} ₴`} />
                        <TextInfo label="Сума:" text={`${Number(product.p) * Number(productCounts[product._id])} ₴`} />

                        <TextInfo
                          label="Кількість:"
                          component={
                            <QuantitySelector
                              key={product?._id ?? index}
                              quantity={productCounts[product._id]}
                              onDecrease={() => handleQuantityChange(product._id, -1)}
                              onIncrease={() => handleQuantityChange(product._id, 1)}
                            />
                          }
                          // text={`${product.p} ₴`}
                        />
                      </RowGroup>
                    </FlexBox>
                  </Card>
                );
              })}
            </Box>

            <Box>
              <TextGroup children="Доставка" />

              <div className="editable-field">
                <Typography>{formData.city}</Typography>
                <button type="button" onClick={() => alert('Змінити місто')}>
                  Змінити
                </button>
              </div>
              <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} required>
                <option value="Самовивіз з Нової Пошти">Самовивіз з Нової Пошти</option>
              </select>
              <input
                className="order-form-input"
                aria-label="address input"
                placeholder="Виберіть відповідну адресу"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <TextGroup children="Оплата" />
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                <option value="Оплата під час отримання товару">Оплата під час отримання товару</option>
              </select>
            </Box>

            <Box>
              <TextGroup children="Отримувач" />
              <div className="editable-field">
                <Typography>{formData.recipientName}</Typography>
                <button type="button" onClick={() => alert("Змінити ім'я отримувача")}>
                  Змінити
                </button>
              </div>
            </Box>
          </Box>

          <Card ml={50} pl={20} className="finished-sell">
            <TItle children="Разом" />

            <InfoRow mt={30} leftText={`${basket?.length ?? 0} товар${basket?.length > 1 ? 'и' : ''} на суму`} rightText={`${newFinishCost} ₴`} />

            <InfoRow mt={20} mb={12} leftText="Вартість доставки" rightText="за тарифами перевізника" />
            <Divider color="gray30" />
            <InfoRow mt={20} mb={20} leftText="До сплати" rightText={`${newFinishCost} ₴`} />
            <Divider color="gray30" />

            <PrimaryButton mt={20} mb={20} type="submit" children="Замовлення підтверджую" />

            <Typography color="gray50" sz={10} fw={500}>
              Підтверджуючи замовлення, я приймаю умови:
              <br />
              <span>&nbsp;&#8226; положення про обробку і захист персональних даних</span>
              <br />
              <span>&nbsp;&#8226; угоди користувача</span>
            </Typography>
          </Card>
        </FlexBox>
      </form>
    </Modal>
  );
};

export default PlacingAnOrder;
