'use client'

import React, { ReactNode } from 'react'
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Avatar,
    Heading,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
} from '@chakra-ui/react'
import {
    FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

interface LinkItemProps {
    name: string
    link: string
    avatar: string
}

const LinkItems: Array<LinkItemProps> = [{
    name: 'Toàn Nguyễn Thi',
    link: "/home",
    avatar: "http://127.0.0.1:5000/uploads/1701270079511.png"
}, {
    name: 'Nguyễn Huỳnh Thanh Toàn',
    link: "/home",
    avatar: "http://127.0.0.1:5000/uploads/1701270079511.png"
}, {
    name: 'Toàn Nguyễn',
    link: "/home",
    avatar: "http://127.0.0.1:5000/uploads/1701270079511.png"
}, {
    name: 'Toàn Nguyễn',
    link: "/home",
    avatar: "http://127.0.0.1:5000/uploads/1701270079511.png"
}, { name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" }]


export default function ListFollowing() {
    const { isOpen, onOpen, onClose } = useDisclosure()


    // pos={"fixed"}
    return (<Box minH="100vh" bg={useColorModeValue("white", 'gray.900')}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // returnFocusOnClose={}
            onOverlayClick={onClose}

        >
            <DrawerContent >
                <SidebarContent onClose={onClose} />
            </DrawerContent>
        </Drawer>
        {/* mobilenav */}

        <Box ml={{ base: 0, md: 60 }} p="4">
            {/* Content */}
        </Box>

    </Box>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (<Box
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full' }}
        maxHeight={"100%"}
        // pos={"fixed"}

        position={"fixed"}
        overflow={"scroll"}
        overflowY={"scroll"}
        overflowX={"hidden"}
        overscrollBehaviorY={"contain"}

        overscrollBehavior={"none"}
        style={{ transition: "transform 0.3s ease-in-out" }}

        {...rest}>
        <Box
            as="a"

            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                mt={3}
                borderRadius="lg"
                role="group"
                cursor="pointer"

            >

                <Heading as="h2" size="l">
                    List Following
                </Heading>



            </Flex>
        </Box>


        {LinkItems.map((link) => (<NavItem key={link.name} name={link.name} link={link.link} avatar={link.avatar}>
        </NavItem>))}
    </Box>)
}

interface NavItemProps extends FlexProps {
    name: string
    link: string
    avatar: string


}

const NavItem = ({ name, link, avatar, ...rest }: NavItemProps) => {
    return (<Box
        as="a"
        href={link}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
    >
        <Flex
            align="center"
            p="4"
            mx="4"
            mt={3}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: "rgb(215,36,141)", color: 'white',
                bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
            }}
            {...rest}>
            <Avatar src={avatar} mr={5}></Avatar>
            <Text fontSize={"10px"}> {name}</Text>


        </Flex>
    </Box>)
}
