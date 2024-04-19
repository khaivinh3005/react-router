import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Text } from '@chakra-ui/react';
import {
  handleDownCount,
  handleTranslateStore,
} from '../../Stores/Redux/homeRedux/homeSlice';

const Home = () => {
  const listFood = useSelector((state) => state.storeA.listFood);
  const countBought = useSelector((state) => state.storeA.countBought);
  const hello = useSelector((state) => state.storeA.hello);

  const isClick = useSelector((state) => state.storeA.isClick);
  console.log('isClick : ', isClick);

  // Thực hiện gọi hành động thay đổi state ở store thì dùng dispatch
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(handleDownCount());
  };

  const handleTranslate = () => {
    dispatch(handleTranslateStore('xin chào'));
  };
  return (
    <div>
      <h1>Count Bought : {countBought}</h1>
      <Button mb={10} colorScheme='blue' onClick={handleDispatch}>
        Buy
      </Button>

      <hr />
      <h1>hello : {hello}</h1>
      <Button colorScheme='blue' onClick={handleTranslate}>
        Translate
      </Button>

      <hr />
      <Box mt={5} px={10}>
        {listFood.map((item, index) => {
          return (
            <Box key={index}>
              <span>{item.name}</span>
              <Button className='red text-white'>Remove</Button>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default Home;
