'use client'

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';

export default function ResetPasswordForm() {
    const toast = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState<string | null>("");
    const [passwordReset, setPasswordReset] = useState({
        "password": "", "passwordConfirm": ""
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token_value = searchParams.get("key");
        setToken(token_value);
    }, [location.search]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("onSubmit")
            // Perform any necessary post creation logic here
            console.log(passwordReset);
            console.log("----loading--")


            console.log("token", token)
            axios.patch('http://localhost:5000/api/v1/users/resetPassword/' + token, JSON.stringify(passwordReset), {
                headers: {
                    'Content-Type': 'application/json', // 'authorization': `Bearer ${token}`,
                },
            }).then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    toast({
                        title: 'Password reset successful', status: 'info', duration: 9000, isClosable: true, position: 'top',
                    })
                    navigate('/');
                }
            }).catch(error => {
                toast({
                        title: error.response.data.message, status: 'error', duration: 9000, isClosable: true, position: 'top',
                    })
            });


        } catch (e) {
            console.log(e)
        }

    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPasswordReset((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    return (<Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
                    Enter new password
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name={"password"} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl id="passwordConfirm" isRequired>
                        <FormLabel>Password Confirm</FormLabel>
                        <Input type="password" name={"passwordConfirm"} onChange={handleInputChange}/>
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            type={"submit"}
                        >
                            Submit

                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Flex>)
}