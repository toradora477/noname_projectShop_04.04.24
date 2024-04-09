import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './commonReducer';

export const store = configureStore(
  {
    reducer: { common: commonReducer },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
