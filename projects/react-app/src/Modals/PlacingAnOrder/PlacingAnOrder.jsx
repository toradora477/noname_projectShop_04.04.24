import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request, retrieveCategoryAndSubcategoryLabels } from '../../tools';
import {
  Modal,
  PrimaryButton,
  Typography,
  PreviewImage,
  Card,
  Box,
  FlexBox,
  QuantitySelector,
  Divider,
  RowGroup,
  SelectSquare,
} from '../../components';
import { setModal, addBasket, removeBasket, cleanBasket } from '../../store/commonReducer';
import './PlacingAnOrder.scss';

const PlacingAnOrder = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.common.basket) ?? [];
  const products = useSelector((state) => state.common.products) ?? [];
  const userAuth = useSelector((state) => state.common.userAuth);
  const novaPoshtaBranches = useSelector((state) => state.common.novaPoshtaBranches);

  const { TextInfo } = RowGroup;

  const [formData, setFormData] = useState({
    firstName: userAuth?.firstName ?? '',
    lastName: userAuth?.lastName ?? '',
    phoneNumber: userAuth?.phoneNumber ?? '',
    email: userAuth?.email ?? '',

    deliveryMethod: 'Самовивіз з Нової Пошти',
    paymentMethod: 'Оплата під час отримання товару',
    recipientName: 'Яна Іваненко',

    region: userAuth?.region ?? '',
    city: userAuth?.city ?? '',
    address: userAuth?.address ?? '',
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const [selectedAddress, setSelectedAddress] = useState('');

  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const [productSizes, setProductSizes] = useState({});
  const [productColors, setProductColors] = useState({});

  const productsWithQuantities = filteredProducts.map((product) => ({
    productId: product._id,
    quantity: productCounts[product._id] || 0,
    size: productSizes[product._id] || undefined,
    color: productColors[product._id] || undefined,
  }));

  const [Title, TextGroup, Label] = [
    ({ children, mt, mb }) => <Typography children={children} mt={mt} mb={mb} fs={24} fw={400} />,
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 20} mb={mb} fs={14} fw={600} />,
    ({ children, mt, mb }) => <Typography children={children} mt={mt ?? 0} mb={mb ?? 4} fs={12} fw={600} color="dark_gray" />,
  ];

  const handleRegionChange = (e) => {
    const region = e.target.value;

    setFormData({ ...formData, region: region, city: '' });
    setFilteredAddresses([]);
    const cities = novaPoshtaBranches?.filter((branch) => branch.SettlementAreaDescription === region)?.map((branch) => branch.SettlementDescription);

    setFilteredCities([...new Set(cities)]);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;

    setFormData({ ...formData, city: city });
    const addresses = novaPoshtaBranches
      ?.filter((branch) => branch.SettlementAreaDescription === formData.region && branch.SettlementDescription === city)

      ?.map((branch) => branch.Description);

    setFilteredAddresses(addresses);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSelectSize = (productId, size) => {
    setProductSizes({ ...productSizes, [productId]: size });
  };

  const onSelectColor = (productId, color) => {
    setProductColors({ ...productColors, [productId]: color });
  };

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

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setFormData({ ...formData, address: address });
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
      // region: formData.region,
      // city: formData.city,
      // address: formData.address,
    };

    // console.table(userAuth);
    console.table(orderData);
    // console.table(orderData.products);

    // request.post('/orders/addOrder', orderData, (res) => {
    //   console.log('Замовлення успішно оформлене', res);
    //   dispatch(cleanBasket());
    //   dispatch(setModal());
    // });
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
      <Title mb={10} children="Оформлення замовлення" />
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
                  value={formData.firstName}
                  onChange={handleChange}
                  required
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
                  value={formData.lastName}
                  onChange={handleChange}
                  required
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
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>
            </FlexBox>

            <Box>
              <TextGroup children="Замовлення" />
              {filteredProducts?.map((product, index) => {
                const sizesProduct = product?.s ?? [];
                const colorsProduct = product?.f?.map((i) => (i = i.color)) ?? [];
                const resultLabelCategory = retrieveCategoryAndSubcategoryLabels(product.c?.[0], product.c?.[1]);

                return (
                  <Card pl={7} key={product?._id ?? index} className="product-item">
                    <FlexBox>
                      <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]?.files?.[0]} className="product-image" />
                      <RowGroup>
                        <TextInfo label="Назва:" text={product.n} />{' '}
                        <TextInfo
                          label="Розмір:"
                          component={<SelectSquare mr={8} optionsText={sizesProduct} onSelect={(index) => onSelectSize(product._id, index.text)} />}
                        />
                        <TextInfo label="Категорія:" text={resultLabelCategory?.subcategoryLabel ?? ''} />
                        <TextInfo
                          label="Колір:"
                          component={
                            <SelectSquare mr={8} optionsColor={colorsProduct} onSelect={(index) => onSelectColor(product._id, index.color)} />
                          }
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
                        />
                      </RowGroup>
                    </FlexBox>
                  </Card>
                );
              })}
            </Box>

            <Box>
              <TextGroup children="Доставка" />

              {novaPoshtaBranches ? (
                <Box>
                  <FlexBox mb={24}>
                    <Box>
                      <Label>Область</Label>
                      <select value={formData.region} onChange={handleRegionChange} required>
                        <option value="">Оберіть область</option>
                        {[...new Set(novaPoshtaBranches.map((branch) => branch.SettlementAreaDescription))].map((region, index) => (
                          <option key={index} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </Box>
                    &nbsp;&nbsp;
                    <Box>
                      <Label>Місто</Label>

                      <select disabled={!formData.region} value={formData.city} onChange={handleCityChange} required>
                        <option value="">Оберіть місто</option>
                        {filteredCities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </Box>
                  </FlexBox>

                  <Box>
                    <Label>Відділення Нової Пошти</Label>

                    <select disabled={!formData.city} value={formData.address} onChange={handleAddressChange} required>
                      <option value="">Оберіть адресу</option>
                      {filteredAddresses.map((address, index) => (
                        <option key={index} value={address}>
                          {address}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <FlexBox mb={24}>
                    <Box>
                      <Label>Область</Label>
                      <input
                        className="order-form-input"
                        type="text"
                        aria-label="input reqion"
                        value={formData.region}
                        onChange={handleRegionChange}
                        required
                      />
                    </Box>
                    &nbsp;&nbsp;
                    <Box>
                      <Label>Місто</Label>
                      <input
                        className="order-form-input"
                        type="text"
                        aria-label="input city"
                        value={formData.city}
                        onChange={handleCityChange}
                        required
                      />
                    </Box>
                  </FlexBox>
                  <Box>
                    <Label>Адреса</Label>
                    <input
                      className="order-form-input"
                      type="text"
                      aria-label="input address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Box>
                </Box>
              )}
            </Box>

            <Box>
              <TextGroup children="Оплата" />
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                <option value="Оплата під час отримання товару">Оплата під час отримання товару</option>
              </select>
            </Box>

            <Box>
              <TextGroup children="Отримувач" />
              <input
                className="order-form-input"
                name="recipient"
                aria-label="input name"
                value={formData.recipient}
                onChange={handleChange}
                required
              />
            </Box>
          </Box>

          <Card ml={50} pl={20} className="finished-sell">
            <Title children="Разом" />

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
