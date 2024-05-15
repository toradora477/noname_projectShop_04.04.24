import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setProducts, updateUserAuth } from '../store/commonReducer';
import { request } from './index';

const useClientViewData = () => {
  const userAuth = useSelector((state) => state.common.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getListProducts = () =>
      new Promise((resolve, reject) => {
        const body = { actualization: true };

        request.get('/products/getListAllProducts', body, (res) => {
          if (res.data) {
            dispatch(setProducts(res.data));
            resolve();
          } else reject(new Error('Failed to fetch product list'));
        });
      });

    const getAccountInfo = () =>
      new Promise((resolve, reject) => {
        if (userAuth && typeof userAuth === 'object') {
          request.get('/auth/getAccountInfo', {}, (res) => {
            if (res.data && typeof res.data === 'object') {
              dispatch(updateUserAuth(res.data));
              resolve();
            } else reject(new Error('Failed to fetch account info'));
          });
        } else resolve();
      });

    Promise.all([getListProducts(), getAccountInfo()]).catch((error) => console.error('Error:', error.message));
  }, [dispatch]);
};

export { useClientViewData };
