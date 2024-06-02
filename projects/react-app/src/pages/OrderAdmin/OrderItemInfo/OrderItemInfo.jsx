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

  console.log(item);
  console.log(isClient);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const newFinishCost =
    filteredProducts
      .map((product) => ({
        price: product.p,
        quantity: productCounts[product._id] || 0,
      }))
      .reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0) ?? 0;

  console.log('filteredProducts', filteredProducts);

  useEffect(() => {
    const filteredProducts = products.filter((product) => item.products.some((item) => item.productId === product._id));

    // const productCounts = basket.reduce((counts, productId) => {
    //   counts[productId] = (counts[productId] || 0) + 1;
    //   return counts;
    // }, {});

    console.log('filteredProducts', filteredProducts);

    setFilteredProducts(filteredProducts);
    // setProductCounts(productCounts);
  }, [products]);

  return (
    <div className="order-list-item">
      <Spin spinning={loading}>
        <Card pl={16} className="order-info-card ">
          <div className="section">
            <TextGroup children="Замовлення" />
            {filteredProducts?.map((product, index) => (
              <Card mb={10} pl={7} key={product?._id ?? index} className="product-item">
                <FlexBox>
                  <PreviewImage style={{ width: '90px', height: '90px' }} fileID={product?.f?.[0]?.files?.[0]} className="product-image" />
                  <div>
                    <Typography>{product.n}</Typography>
                    <Typography>{product.p} ₴</Typography>
                  </div>
                  <QuantitySelector
                    key={product?._id ?? index}
                    quantity={productCounts[product._id]}
                    // onDecrease={() => handleQuantityChange(product._id, -1)}
                    // onIncrease={() => handleQuantityChange(product._id, 1)}
                  />
                </FlexBox>
              </Card>
            ))}
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default OrderItemInfo;
