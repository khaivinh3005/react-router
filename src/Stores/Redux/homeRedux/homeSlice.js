import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listShoes: [],
  cart: [],
};

export const homeSlice = createSlice({
  name: 'homeRedux',
  initialState,
  reducers: {
    handleGetListShoes: (state, action) => {
      state.listShoes = action.payload;
    },

    handleAddToCartStore: (state, action) => {
      const item = { ...action.payload, count: 1 };
      const cartStore = [...state.cart];
      if (cartStore.length > 0) {
        const isExist = cartStore.find((item) => item.id === action.payload.id);
        if (!isExist) {
          cartStore.push(item);
        } else {
          alert('Da ton tai');
        }
      } else {
        cartStore.push(item);
      }

      state.cart = cartStore;
    },

    upToCountStore: (state, action) => {
      const cartStore = [...state.cart];
      const product = action.payload;
      cartStore.map((item) => {
        if (item.id === product.id) {
          const itemUpdate = { ...item, count: item.count++ };
          return itemUpdate;
        }
        return item;
      });

      state.cart = cartStore;
    },
  },
});

export const { handleGetListShoes, handleAddToCartStore, upToCountStore } =
  homeSlice.actions;

export default homeSlice.reducer;
