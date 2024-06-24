import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './commonReducer';
import screenSizeReducer from './screenSizeReducer';

export const store = configureStore(
  {
    reducer: { screenSize: screenSizeReducer, common: commonReducer },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
