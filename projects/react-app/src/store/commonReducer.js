import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../common_constants/business';
import { getTokenData } from '../tools';

const userToken = window.localStorage.getItem(ACCESS_TOKEN);
const userAuth = getTokenData(userToken);

const initialState = {
  modal: { name: '', data: {} },
  basket: null,
  products: null,
  userAuth: userAuth && { ...userAuth, token: userToken },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.products.sort((a, b) => b.i - a.i);
    },
    addProduct: (state, action) => {
      (state.products ??= []).unshift(action.payload);
    },
    // setBasket: (state, action) => {
    //   state.basket = action.payload;
    // },
    addBasket: (state, action) => {
      (state.basket ??= []).unshift(action.payload);
    },
    removeBasket: (state, action) => {
      const indexToRemove = state.basket.findIndex((item) => item === action.payload);

      if (indexToRemove !== -1) {
        (state.basket ??= []).splice(indexToRemove, 1);
      }
    },
    setModal: (state, action) => {
      state.modal = {
        ...action.payload,
        prev: action.payload?.prev || (state.modal.name ? state.modal : undefined),
      };
    },
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    updateUserAuth: (state, action) => {
      const { payload } = action;
      if (!payload || typeof payload !== 'object') return;

      state.userAuth = { ...(state.userAuth || {}), ...payload };
    },
  },
});

export const { setProducts, addProduct, addBasket, setModal, setUserAuth, updateUserAuth, removeBasket } = commonSlice.actions;

export default commonSlice.reducer;
