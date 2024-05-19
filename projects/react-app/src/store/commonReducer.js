import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../common_constants/business';
import { getTokenData } from '../tools';
import { ROLES } from '../common_constants/business';

const userToken = window.localStorage.getItem(ACCESS_TOKEN);
const userAuth = getTokenData(userToken);

const getAccessRoles = (role) => {
  const normalizedRole = role || ROLES.guest;
  return {
    isAdmin: ROLES[normalizedRole] === ROLES.admin,
    isNotAdmin: ROLES[normalizedRole] !== ROLES.admin,
    isClientOrAbove: ROLES[normalizedRole] <= ROLES.client,
    isClient: ROLES[role] === ROLES.client,
  };
};

const initialState = {
  modal: { name: '', data: {} },
  basket: null,
  products: null,
  userAuth: userAuth && { ...userAuth, token: userToken },
  accessRoles: userAuth ? getAccessRoles(userAuth.role) : getAccessRoles(ROLES.guest),
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
      (state.products ?? []).unshift(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = (state.products ?? []).filter((item) => item._id !== action.payload);
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
        (state.basket ?? []).splice(indexToRemove, 1);
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
      state.accessRoles = getAccessRoles(action.payload?.role);
    },
    updateUserAuth: (state, action) => {
      const { payload } = action;
      if (!payload || typeof payload !== 'object') return;

      state.userAuth = { ...(state.userAuth || {}), ...payload };
      state.accessRoles = getAccessRoles(payload.role);
    },
    addFavoriteProduct: (state, action) => {
      const productId = action.payload;
      if (!state.userAuth) return;
      if (!state.userAuth.fav) {
        state.userAuth.fav = [productId];
      } else if (!state.userAuth.fav.includes(productId)) {
        state.userAuth.fav.push(productId);
      }
    },
    removeFavoriteProduct: (state, action) => {
      const productId = action.payload;
      if (!state.userAuth || !state.userAuth.fav) return;
      state.userAuth.fav = state.userAuth.fav.filter((id) => id !== productId);
    },
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  addBasket,
  setModal,
  setUserAuth,
  updateUserAuth,
  removeBasket,
  addFavoriteProduct,
  removeFavoriteProduct,
} = commonSlice.actions;

export default commonSlice.reducer;
