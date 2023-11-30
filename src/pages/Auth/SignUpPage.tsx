'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue, useToast,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

import axios, {isCancel, AxiosError,AxiosResponse} from 'axios';
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
    const navagate=useNavigate()
    const toast=useToast()
    const [InputBodySignUp, setInputBodySignUp] = useState({
        email: '', password: '', firstName: '', lastName: '', passwordConfirm: ""

    });
    const [showPassword, setShowPassword] = useState(false)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputBodySignUp((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Access the values from the state variable InputBodySignUp
        const {email, password, firstName, lastName, passwordConfirm} = InputBodySignUp;
        console.log(InputBodySignUp);

        // Perform any necessary validation or processing on the form data
        // ...

        try {
            // Make an API call using the fetch function
            await axios.post('http://localhost:5000/api/v1/users/signup',JSON.stringify(InputBodySignUp),{headers: {
                    'Content-Type': 'application/json',
                }}).then(response=>{
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    toast({
                        title: 'Sign up successful',
                        status:'success',
                        duration: 900,
                        position: 'top',
                        isClosable: true,
                    })


            }).catch(e=>
            {
                if(e.response.status ==400){
                    toast({
                        title: e.response.data.message,
                        status: 'error',
                        duration: 900,
                        position: 'top',

                        isClosable: true,
                    })
                }
            })


        } catch (error) {
            // Handle any network or other errors
            console.error(error);
        }

    };

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool features ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <form onSubmit={handleSubmit}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" name={"firstName"} onChange={handleInputChange}/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" name={"lastName"}  onChange={handleInputChange}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name={"email"} onChange={handleInputChange}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name={"password"} onChange={handleInputChange}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                        </FormControl>
                        <FormControl id="passwordConfirm" isRequired>
                            <FormLabel>Password Confirm</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name={"passwordConfirm"} onChange={handleInputChange}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                type="submit"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Stack>
    </Flex>)
}