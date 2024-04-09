import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: { name: '', data: {} },
  basket: null,
  products: null,
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
  },
});

export const { setProducts, setBasket, setModal } = commonSlice.actions;

export default commonSlice.reducer;
