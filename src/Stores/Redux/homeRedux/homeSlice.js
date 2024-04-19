import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listFood: [
    {
      name: 'rice chicken',
      price: 10,
      count: 10,
    },
    {
      name: 'rice duck',
      price: 20,
      count: 5,
    },
  ],
  countBought: 15,
  hello: 'hello',
  isClick: false,
};

export const homeSlice = createSlice({
  name: 'homeRedux',
  initialState,
  reducers: {
    // nơi chứa function thay đổi state ở store
    handleDownCount: (state) => {
      //1 countBought từ state
      //2 giảm countBought
      state.countBought -= 1;
    },
    handleTranslateStore: (state, action) => {
      console.log('sate : ', state.hello);
      console.log('payload : ', action.payload);

      state.hello = action.payload;
      state.isClick = !state.isClick;
    },
  },
});

export const { handleDownCount, handleTranslateStore } = homeSlice.actions;

export default homeSlice.reducer;
