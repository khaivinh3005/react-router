import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { API_ENDPOINTS } from '../../API/Constanst';
import { useNavigate } from 'react-router-dom';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
    }
    const responseData = await response.json();
    localStorage.setItem('access_token', responseData.access_token);
    localStorage.setItem('refresh_token', responseData.refresh_token);
    navigate('/');
  };

  return (
    <Box maxW='md' mx='auto' mt={8} p={6} borderWidth={1} borderRadius='lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            type='email'
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register('password', { required: 'Password is required' })}
            type='password'
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme='teal' type='submit'>
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default Login;
