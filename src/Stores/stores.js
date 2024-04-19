import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Redux/counterSlice';
import homeSlice from './Redux/homeRedux/homeSlice.js';

// store sẽ là siêu thị chứa nhiều cửa hàng

// cửa hàng a là homeSlice

export const store = configureStore({
  reducer: {
    storeA: homeSlice,
  },
});
