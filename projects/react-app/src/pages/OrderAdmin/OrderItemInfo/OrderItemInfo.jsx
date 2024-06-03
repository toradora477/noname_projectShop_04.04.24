import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request, getFormattedDateWithRelativeDays } from '../../../tools';
import {
  PrimaryButton,
  Typography,
  FlexBox,
  Product,
  Empty,
  Spin,
  Card,
  List,
  Divider,
  Modal,
  PreviewImage,
  Box,
  QuantitySelector,
} from '../../../components';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderItemInfo = ({ item }) => {
  // const products = useSelector((state) => state.common.products) ?? [];
  // const item = products.find((item) => item._id === orderId);
  const products = useSelector((state) => state.common.products) ?? [];
  const [loading, setLoading] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const Title = ({ children, mt }) => <Typography children={children} mt={mt ?? 0} sz={18} fw={700} />;

  const isClient = item.authorInfo;

  const TextGroup = ({ children }) => <Typography children={children} mb={4} fs={14} fw={600} />;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const handleOnArchive = () => {};

  useEffect(() => {
    // Фильтруем продукты, которые есть в заказе
    const filteredProducts = products.filter((product) => item.products.some((orderProduct) => orderProduct.productId === product._id));

    // Создаем объект productCounts, используя данные из item.products
    const productCounts = item.products.reduce((counts, orderProduct) => {
      counts[orderProduct.productId] = orderProduct.quantity;
      return counts;
    }, {});

    setFilteredProducts(filteredProducts);
    setProductCounts(productCounts);
  }, [products, item.products]);

  const newFinishCost =
    filteredProducts
      .map((product) => ({
        price: product.p,
        quantity: productCounts[product._id] || 0,
      }))
      .reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0) ?? 0;

  console.log('item', item);
  console.log('filteredProducts', filteredProducts);
  console.log('productCounts', productCounts);
  console.log('newFinishCost', newFinishCost);

  return (
    <div className="order-list-item">
      <Spin spinning={loading}>
        {filteredProducts?.map((product, index) => (
          <Card mb={10} pl={7} key={product?._id ?? index} className="product-item">
            <FlexBox>
              <PreviewImage fileID={product?.f?.[0]?.files?.[0]} className="product-image" />

              <div className="order-info">
                <TextInfo label="Назва:" text={product.n} />
                <TextInfo label="Ціна:" text={`${product.p} ₴`} />
                <TextInfo label="Кількість:" text={productCounts[product._id]} />
                <TextInfo label="Сума:" text={`${Number(product.p) * Number(productCounts[product._id])} ₴`} />
              </div>
            </FlexBox>
          </Card>
        ))}

        <div className="order-info">
          <TextInfo label="Забере:" text={item.deliveryMethod} />
          <TextInfo label="Ціна:" text={`${newFinishCost} ₴`} />
          <TextInfo label="Оплата:" text={item.paymentMethod} />
        </div>
        <PrimaryButton mt={20} children="Архівувати" onClick={handleOnArchive} />
      </Spin>
    </div>
  );
};

export default OrderItemInfo;
