import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setProducts, updateUserAuth, setNovaPoshtaBranches } from '../store/commonReducer';
import { request } from './';

const useClientViewData = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.common.userAuth);
  const novaPoshtaBranches = useSelector((state) => state.common.novaPoshtaBranches);

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

    Promise.all([getAccountInfo(), getListProducts()]).catch((error) => console.error('Error:', error.message));
  }, [dispatch]);

  useEffect(() => {
    if (novaPoshtaBranches) return;

    const getListNovaPoshtaBranches = () =>
      new Promise((resolve, reject) => {
        request.get('/api/getNovaPoshtaBranches', {}, (res) => {
          if (res.data) {
            dispatch(setNovaPoshtaBranches(res.data));
            console.log(res.data.length);
            resolve();
          } else reject(new Error('Failed to fetch branches nova poshta list'));
        });
      });

    const delayedFetch = () => {
      setTimeout(() => {
        Promise.all([getListNovaPoshtaBranches()]).catch((error) => console.error('Error:', error.message));
      }, 0);
    };

    delayedFetch();
  }, [dispatch]);
};

export { useClientViewData };
