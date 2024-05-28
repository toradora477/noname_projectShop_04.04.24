import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../common_constants/business';
import { getTokenData } from '../tools';
import { ROLES } from '../common_constants/business';

const userToken = window.localStorage.getItem(ACCESS_TOKEN);
const userAuth = getTokenData(userToken);

const getAccessRoles = (role) => {
  const normalizedRole = role || 'guest';
  return {
    isClientOrAbove: ROLES[normalizedRole] <= ROLES.client,

    isAdmin: ROLES[normalizedRole] === ROLES.admin,
    isClient: ROLES[normalizedRole] === ROLES.client,

    isNotAdmin: ROLES[normalizedRole] !== ROLES.admin,
    isNotClient: ROLES[normalizedRole] !== ROLES.client,
  };
};

const patchProductsIsFavoriteStatus = (state) => {
  if (!Array.isArray(state.products) || !state.userAuth || !state.accessRoles || state.accessRoles?.isNotClient) return;

  state.products = state.products.map((product) => ({
    ...product,
    isFavorite: state.userAuth?.fav?.includes(product._id) ?? false,
  }));
};

const initialState = {
  modal: { name: '', data: {} },
  userAuth: userAuth && { ...userAuth, token: userToken },
  accessRoles: userAuth ? getAccessRoles(userAuth.role) : getAccessRoles('guest'),
  basket: null,
  products: null,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = {
        ...action.payload,
        prev: action.payload?.prev || (state.modal.name ? state.modal : undefined),
      };
    },
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
      state.accessRoles = getAccessRoles(action.payload?.role);

      patchProductsIsFavoriteStatus(state);
    },
    updateUserAuth: (state, action) => {
      const { payload } = action;
      if (!payload || typeof payload !== 'object') return;

      state.userAuth = { ...(state.userAuth || {}), ...payload };
      state.accessRoles = getAccessRoles(payload.role);

      patchProductsIsFavoriteStatus(state);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.products.sort((a, b) => b.i - a.i);

      patchProductsIsFavoriteStatus(state);
    },
    addProduct: (state, action) => {
      if (state.accessRoles?.isNotAdmin) return;

      (state.products ?? []).unshift(action.payload);
    },
    deleteProduct: (state, action) => {
      if (state.accessRoles?.isNotAdmin) return;

      state.products = (state.products ?? []).filter((item) => item._id !== action.payload);
    },
    addBasket: (state, action) => {
      (state.basket ??= []).unshift(action.payload);
    },
    removeBasket: (state, action) => {
      const indexToRemove = state.basket?.findIndex((item) => item === action.payload) ?? -1;

      if (indexToRemove !== -1) {
        (state.basket ?? []).splice(indexToRemove, 1);
      }
    },
    addFavoriteProduct: (state, action) => {
      if (state.accessRoles?.isNotClient || !state.userAuth) return;

      const productId = action.payload;
      if (!state.userAuth?.fav) {
        state.userAuth.fav = [productId];
      } else if (!state.userAuth?.fav?.includes(productId)) {
        state.userAuth.fav.push(productId);
      }

      patchProductsIsFavoriteStatus(state);
    },
    removeFavoriteProduct: (state, action) => {
      if (state.accessRoles?.isNotClient || !state.userAuth || !state.userAuth?.fav) return;

      const productId = action.payload;
      state.userAuth.fav = state.userAuth.fav.filter((id) => id !== productId);

      patchProductsIsFavoriteStatus(state);
    },
  },
});

export const {
  setModal,
  setUserAuth,
  updateUserAuth,
  setProducts,
  addProduct,
  deleteProduct,
  addBasket,
  removeBasket,
  addFavoriteProduct,
  removeFavoriteProduct,
} = commonSlice.actions;

export default commonSlice.reducer;
