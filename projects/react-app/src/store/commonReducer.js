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
    },
    setBasket: (state, action) => {
      state.basket = action.payload;
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
  },
});

export const { setProducts, setBasket, setModal, setUserAuth } = commonSlice.actions;

export default commonSlice.reducer;
