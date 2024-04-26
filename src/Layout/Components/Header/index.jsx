import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';
import { CiDiscount1 } from 'react-icons/ci';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Button,
  useDisclosure,
  Image,
  Checkbox,
} from '@chakra-ui/react';
import {
  downToCountStore,
  handleAddVoucherStore,
  upToCountStore,
} from '../../../Stores/Redux/homeRedux/homeSlice';
import { useState } from 'react';
import { useEffect } from 'react';
const HeaderComponent = () => {
  /**
   * 0. State mã store = 0;
   * 1. bấm mã giảm giá => gửi mã lên redux và setState ở redux là cái mã store
   * 2. mã store sẽ trả về modal
   *
   */
  const cartStore = useSelector((state) => state.storeA.cart);
  const voucherStore = useSelector((state) => state.storeA.voucherDiscount);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [numberDiscount, setNumberDiscount] = useState(1);
  const total = cartStore.reduce((total, item) => {
    return (total += item.count * item.price);
  }, 0);

  const dispatch = useDispatch();
  const handleCount = (isUpto, item) => {
    if (isUpto) {
      dispatch(upToCountStore(item));
    } else {
      dispatch(downToCountStore(item));
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
          <ModalBody w={600}>
            {cartStore.map((item) => {
              return (
                <Flex alignItems={'center'} key={item.id}>
                  <span>{item.name}</span>
                  <Image
                    height={100}
                    w={100}
                    src={item.image}
                    alt={item.name}
                  />
                  <Button onClick={() => handleCount(false, item)}>-</Button>
                  <Box mx={3}>{item.count}</Box>
                  <Button onClick={() => handleCount(true, item)}>+</Button>
                </Flex>
              );
            })}
          </ModalBody>
          <Flex justifyContent={'space-between'} px={5} pb={2}>
            <Flex
              alignItems={'center'}
              border={'1px solid black'}
              borderRadius={8}
              p={2}
              gap={2}
              cursor={'pointer'}
              onClick={() => {
                const numberRandom = Math.floor(Math.random() * 100) + 1;
                dispatch(handleAddVoucherStore(numberRandom));
                setIsOpenDiscountModal(true);
              }}
            >
              <span>Mã giảm giá</span> <CiDiscount1 />
            </Flex>
            <h1>
              Total:
              {numberDiscount !== 1 ? (numberDiscount * total) / 100 : total} $
            </h1>
          </Flex>
          <hr />
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
        <Modal
          isOpen={isOpenDiscountModal}
          onClose={() => {
            setIsChecked(false);
            setNumberDiscount(1);
            setIsOpenDiscountModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <span>Mã giảm giá : {voucherStore}%</span>
                <Checkbox
                  isChecked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                >
                  Checkbox
                </Checkbox>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => {
                  if (isChecked) {
                    console.log('voucherStore : ', voucherStore);
                    setNumberDiscount(voucherStore);
                  }
                  setIsChecked(false);
                  setIsOpenDiscountModal(false);
                }}
              >
                Enter
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Modal>
    </Flex>
  );
};

export default HeaderComponent;
