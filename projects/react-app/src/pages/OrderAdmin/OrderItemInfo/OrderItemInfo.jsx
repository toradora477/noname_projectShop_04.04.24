import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../../store/commonReducer';
import { request, retrieveCategoryAndSubcategoryLabels } from '../../../tools';
import { PrimaryButton, FlexBox, Spin, Card, PreviewImage, RowGroup, SelectSquare } from '../../../components';
import '../OrderAdmin.scss';

const OrderItemInfo = ({ item }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.common.products) ?? [];
  const orders = useSelector((state) => state.common.orders) ?? [];
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  const { TextInfo } = RowGroup;

  if (item.i === 19) console.table(item);

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
    const filteredProducts =
      products
        ?.filter((product) => item.products.some((orderProduct) => orderProduct.productId === product._id))
        ?.map((product) => {
          const orderProduct = item.products.find((orderProduct) => orderProduct.productId === product._id);
          return {
            ...product,
            size: orderProduct.size ?? null,
            color: orderProduct.color ?? null,
          };
        }) ?? [];

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

  return (
    <div className="order-list-item">
      {filteredProducts?.map((product, index) => {
        // const sizesProduct = product?.s ?? [];
        const sizesProduct = product.size ? [product.size] : [];
        console.log(product);

        // item.products;
        const colorsProduct = product.color ? [product.color] : [];
        const resultLabelCategory = retrieveCategoryAndSubcategoryLabels(product.c?.[0], product.c?.[1]);

        return (
          <Card mb={10} pl={7} key={product?._id ?? index} className="product-item">
            <FlexBox>
              <PreviewImage fileID={product?.f?.[0]?.files?.[0]} className="product-image" />

              <RowGroup>
                <TextInfo label="Назва:" text={product.n} />
                <TextInfo label="Розмір:" component={<SelectSquare mr={8} optionsText={sizesProduct} />} />
                <TextInfo label="Категорія:" text={resultLabelCategory?.subcategoryLabel ?? ''} />
                <TextInfo label="Колір:" component={<SelectSquare mr={8} optionsColor={colorsProduct} />} />
                <TextInfo label="Ціна:" text={`${product.p} ₴`} />
                <TextInfo label="Кількість:" text={productCounts[product._id]} />
                <TextInfo label="Сума:" text={`${Number(product.p) * Number(productCounts[product._id])} ₴`} />
              </RowGroup>
            </FlexBox>
          </Card>
        );
      })}

      <RowGroup>
        <TextInfo label="Забере:" text={item.deliveryMethod} />
        <TextInfo label="Ціна:" text={`${newFinishCost} ₴`} />
        <TextInfo label="Оплата:" text={item.paymentMethod} />
      </RowGroup>
      <Spin spinning={loading}>
        <PrimaryButton disabled={!!item.ag} mt={20} children="Архівувати" onClick={handleOnArchive} />
      </Spin>
    </div>
  );
};

export default OrderItemInfo;
