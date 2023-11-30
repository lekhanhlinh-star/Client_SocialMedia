'use client'

import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import axios, {isCancel, AxiosError,AxiosResponse} from 'axios';


import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login_page() {

    const navigate=useNavigate();
    const toast = useToast()
    const [inputLoginBody, setInputLoginBody] = useState({
        'email': "", 'password': ""
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputLoginBody((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();


            await axios.post('http://localhost:5000/api/v1/users/login', JSON.stringify(inputLoginBody), {
                headers: {
                    'Content-Type': 'application/json',

                },
            }).then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    toast({
                        title: 'Login successful', status: 'success', duration: 9000, isClosable: true, position: 'top',
                    })
                     navigate('/');
                }


            }).catch(e => {
                console.log(e);
                if (e.response.status == 401) {
                    toast({
                        title: "Invalid email or password",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })
                } else if (e.response.status == 400) {
                    toast({
                        title: "Please provide email and password",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })
                }
            })


        } catch (error) {
            console.error('Login error:', error);
        }

    };

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name={"email"} onChange={handleInputChange}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name={"password"} onChange={handleInputChange} required={true}/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'} onClick={e=>{
                                    e.preventDefault();
                                    navigate('/reset_password');
                                }} >Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type={"submit"}
                                _hover={{
                                    bg: 'blue.500',

                                }}>

                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Stack>


    </Flex>)
}