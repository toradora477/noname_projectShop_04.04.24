import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setProducts } from '../store/commonReducer';
import { request } from './index';

const useClientViewData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getListProducts = () => {
      const body = {
        actualization: true,
      };

      request.get('/products/getListAllProducts', body, (res) => {
        if (res.data) dispatch(setProducts(res.data));
      }); // TODO Тестове для api
    };

    getListProducts();
  }, [dispatch]);
};

export { useClientViewData };
