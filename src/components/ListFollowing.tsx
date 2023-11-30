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
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

interface LinkItemProps {
  name: string
  icon: IconType
    link:string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome ,link:"/home" },
  { name: 'Trending', icon: FiTrendingUp,link:"/home"  },
  { name: 'Explore', icon: FiCompass,link:"/home"  },
  { name: 'Favourites', icon: FiStar,link:"/home"  },
  { name: 'Settings', icon: FiSettings,link:"/home"  },
]

export default function ListFollowing() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue("white", 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full' }}
      pos="fixed"
      h="full"
      {...rest}>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
    link: string
  children: ReactText
}
const NavItem = ({ icon,link,children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={link}
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
        _hover={{
          bg: "rgb(215,36,141)",
          color: 'white',
            bgGradient:"linear(to-l, #7928CA, #FF0080)"
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />


    </Flex>
  )
}