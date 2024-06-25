import { createSlice } from '@reduxjs/toolkit';
import { SCREEN_SIZES } from '../common_constants/business';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  deviceType: {
    isMobileScreen: window.innerWidth <= SCREEN_SIZES.MOBILE_MAX,
    isTabletScreen: window.innerWidth > SCREEN_SIZES.MOBILE_MAX && window.innerWidth <= SCREEN_SIZES.TABLET_MAX,
    isDesktopScreen: window.innerWidth > SCREEN_SIZES.TABLET_MAX,
  },
};

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      const { width, height } = action.payload;
      state.width = width;
      state.height = height;
      state.deviceType.isMobileScreen = width <= SCREEN_SIZES.MOBILE_MAX;
      state.deviceType.isTabletScreen = width > SCREEN_SIZES.MOBILE_MAX && width <= SCREEN_SIZES.TABLET_MAX;
      state.deviceType.isDesktopScreen = width > SCREEN_SIZES.TABLET_MAX;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
