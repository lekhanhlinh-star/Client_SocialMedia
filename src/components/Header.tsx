import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    WrapItem,
} from "@chakra-ui/react";
import {
    AddIcon,
    BellIcon,
    ChatIcon,
    DragHandleIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    RepeatIcon,
    Search2Icon,
    SettingsIcon
} from "@chakra-ui/icons";
import React, {useState} from 'react';

interface HeaderProps {
    avatar: string;
}

// 'https://bit.ly/dan-abramov'
function Header(props: HeaderProps) {

    const [searchString, setSearchString] = useState("")

    return (

        <Box as={"nav"} bg="gray.700" py={3} bgImage="url('https://bit.ly/2Z4KKcF')" position={"sticky"} top={0}
             zIndex={999}>
            <Flex justify="space-between" align="center" maxW="1400px" mx="auto" color={"white"}>
                <Spacer/>

                <Heading as="h2" size="lg">
                    Social Network
                </Heading>


                <Spacer/>

                <Input width={"400px"} placeholder='Search...' bg={"white"} color={"black"}
                       value={searchString}
                       onChange={(e) => setSearchString(e.target.value)}
                />
                <Button leftIcon={<Search2Icon/>} mx={"10px"} onClick={() => console.log(searchString)}> Search</Button>

                <Spacer/>

                <HStack>
                    <Breadcrumb spacing='10px' >
                        <IconButton icon={<DragHandleIcon/>} mx={2} isRound={true} colorScheme='gray' aria-label='Done'
                                    size={"lg"} _hover={{
                            background: "white",
                            color: "teal.500",
                            text: "Menu"
                        }}
                                    _active={{content:'"Done"'}}
                        >
                            <BreadcrumbLink href='#'></BreadcrumbLink>
                        </IconButton>
                        <IconButton icon={<ChatIcon/>} mx={2} isRound={true} colorScheme='gray' aria-label='Done'
                                    size={"lg"}>
                            <BreadcrumbLink href='/message'></BreadcrumbLink>
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
                <IconButton aria-label={"setting"} icon={<SettingsIcon/>} colorScheme='gray.550'  isRound={true} >
                     <BreadcrumbLink href='/profile'></BreadcrumbLink>

                </IconButton>
            </Flex>
        </Box>
    );
}

export default Header;