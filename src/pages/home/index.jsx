import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Box,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  handleAddToCartStore,
  handleDownCount,
  handleGetListShoes,
  handleTranslateStore,
} from '../../Stores/Redux/homeRedux/homeSlice';
import { useEffect } from 'react';
import axios from 'axios';

import { APIShoes } from '../../API/Constanst';
import './home.css';

const Home = () => {
  const dispatch = useDispatch();

  const listShoes = useSelector((state) => state.storeA.listShoes);

  const callAPI = async () => {
    await axios.get(APIShoes).then((response) => {
      const data = response.data.content;
      dispatch(handleGetListShoes(data));
    });
  };

  const addToCart = (item) => {
    dispatch(handleAddToCartStore(item));
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Box>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {listShoes.map((item) => {
          return (
            <GridItem w='100%' bg='blue.500' key={item.id}>
              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src={item.image}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{item.name}</Heading>
                    <Text className='dots-des'>{item.description}</Text>
                    <Text color='blue.600' fontSize='2xl'>
                      ${item.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                      Buy now
                    </Button>
                    <Button
                      variant='ghost'
                      colorScheme='blue'
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
