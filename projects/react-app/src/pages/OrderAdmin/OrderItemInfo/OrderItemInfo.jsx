import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../../store/commonReducer';
import { request } from '../../../tools';
import { PrimaryButton, FlexBox, Spin, Card, PreviewImage } from '../../../components';
import '../OrderAdmin.scss';

import TextInfo from '../TextInfo/TextInfo';

const OrderItemInfo = ({ item }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.common.products) ?? [];
  const orders = useSelector((state) => state.common.orders) ?? [];
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const handleOnArchive = async () => {
    setLoading(true);
    await request.patch(
      `/orders/${item._id}/archiveOrder`,
      {},
      (res) => {
        const _orders = orders.map((i) => (i._id === item._id ? { ...i, ...res.data } : i));

        dispatch(setOrders(_orders));
      },
      (error) => {
        console.error('Error adding to archive:', error);
      },
    );
    setLoading(false);
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => item.products.some((orderProduct) => orderProduct.productId === product._id));

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

  // console.log('item', item);
  // console.log('filteredProducts', filteredProducts);
  // console.log('productCounts', productCounts);
  // console.log('newFinishCost', newFinishCost);

  return (
    <div className="order-list-item">
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
      <Spin spinning={loading}>
        <PrimaryButton disabled={!!item.ag} mt={20} children="Архівувати" onClick={handleOnArchive} />
      </Spin>
    </div>
  );
};

export default OrderItemInfo;
