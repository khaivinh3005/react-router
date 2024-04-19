import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Button,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { upToCountStore } from '../../../Stores/Redux/homeRedux/homeSlice';
const HeaderComponent = () => {
  const cartStore = useSelector((state) => state.storeA.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleCount = (isUpto, item) => {
    if (isUpto) {
      dispatch(upToCountStore(item));
    } else {
    }
  };
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      bg='tomato'
      w='100%'
      p={4}
      color='white'
    >
      <h1>Shoppe Fake</h1>
      <Box>
        <FaCartArrowDown onClick={onOpen} size={20} />
        {cartStore.length > 0 ? (
          <Box
            bg={'white'}
            color={'black'}
            borderRadius={'50%'}
            textAlign={'center'}
          >
            {cartStore.length}
          </Box>
        ) : (
          ''
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody w={300}>
            {cartStore.map((item) => {
              return (
                <Flex alignItems={'center'}>
                  <span>{item.name}</span>
                  <Image
                    height={100}
                    w={100}
                    src={item.image}
                    alt={item.name}
                  />
                  <Button onClick={() => handleCount(false, item)}>-</Button>
                  <span>count : {item.count}</span>
                  <Button onClick={() => handleCount(true, item)}>+</Button>
                </Flex>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HeaderComponent;
