import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setProducts } from '../store/commonReducer';
import { PRODUCTS } from '../common_constants/testDataBase';

const useClientViewData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(PRODUCTS));
  }, [dispatch]);
};

export { useClientViewData };
