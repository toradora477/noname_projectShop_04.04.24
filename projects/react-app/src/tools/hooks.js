import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setProducts, setUserAuth } from '../store/commonReducer';
import { request } from './index';

const useClientViewData = () => {
  const userAuth = useSelector((state) => state.common.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getListProducts = () => {
      const body = {
        actualization: true,
      };

      request.get('/products/getListAllProducts', body, (res) => {
        if (res.data) dispatch(setProducts(res.data));
      });
    };

    const getAccountInfo = () => {
      request.get('/auth/getAccountInfo', {}, (res) => {
        if (res.data && typeof res.data === 'object') dispatch(setUserAuth({ ...userAuth, ...res.data }));
      });
    };

    getListProducts();
    if (userAuth && typeof userAuth === 'object') getAccountInfo();
  }, [dispatch]);
};

export { useClientViewData };
