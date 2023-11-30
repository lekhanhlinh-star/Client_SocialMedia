import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbLink,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    IconButton,
    Input,
    Spacer,
    useToast,
    WrapItem,
} from "@chakra-ui/react";
import {BellIcon, DragHandleIcon, Search2Icon, SettingsIcon} from "@chakra-ui/icons";
import React, {useState} from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import axios from "axios";

interface HeaderProps {
    avatar: string;
}

// 'https://bit.ly/dan-abramov'
function Header_chat(props: HeaderProps) {
    const toast = useToast()
    const [User, setUser] = useState([{
        "id":"",
        "profileAv": "",

    }]);
    const [Searchcontent, setSearchcontent] = useState("");

    const {isOpen, onOpen, onClose} = useDisclosure()
    const handle_search = async () => {
        if (Searchcontent === "") {
            toast({
                title: "Need typing search content",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
            return;

        }


        const token = localStorage.getItem("token");

        const api_search_user = ""
        const data = Searchcontent
        await axios.post(api_search_user, data, {
            headers: {
                "authorization": `Bearer ${token}`,
            },

        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }


    return (

        <Box as={"nav"} bg="gray" py={3} position={"sticky"} top={0}
             zIndex={999}>
            <Flex justify="space-between" align="center" maxW="1400px" mx="auto" color={"white"}>


                <Input width={"200px"} placeholder='Search user...' bg={"white"} color={"black"} onClick={onOpen}/>


                <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay/>
                    <DrawerContent width={"500px"}>
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex>
                                <Input width={"350px"} placeholder='Search user...' bg={"white"} color={"black"}
                                       onChange={e => {
                                           setSearchcontent(e.target.value)
                                       }}/>
                                <Button leftIcon={<Search2Icon/>} mx={"10px"} onClick={handle_search}> Search</Button>
                            </Flex>


                        </DrawerHeader>
                        <DrawerBody>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Spacer/>
                <Spacer/>

                <Heading as="h2" size="lg">
                    Social Network
                </Heading>


                <Spacer/>

                <HStack>
                    <Breadcrumb spacing='10px'>
                        <IconButton icon={<DragHandleIcon/>} mx={2} isRound={true} colorScheme='gray' aria-label='Done'
                                    size={"lg"} _hover={{
                            background: "white", color: "teal.500", text: "Menu"
                        }}
                                    _active={{content: '"Done"'}}
                        >
                            <BreadcrumbLink href='#'></BreadcrumbLink>
                        </IconButton>
                        <IconButton icon={<BellIcon/>} mx={2} isRound={true} colorScheme='gray' aria-label='Done'
                                    size={"lg"}>
                            <BreadcrumbLink href='#'></BreadcrumbLink>
                        </IconButton>


                    </Breadcrumb>

                </HStack>

                <WrapItem paddingX={3}>
                    <Avatar name='Dan Abrahmov' src={props.avatar}/>
                </WrapItem>
                <IconButton aria-label={"setting"} icon={<SettingsIcon/>} colorScheme='gray.550' isRound={true}>
                    <BreadcrumbLink href='/profile'></BreadcrumbLink>

                </IconButton>
            </Flex>
        </Box>);
}

export default Header_chat;