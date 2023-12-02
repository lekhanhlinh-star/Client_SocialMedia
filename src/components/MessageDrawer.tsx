import {
    Avatar,
    AvatarBadge,
    Box,
    BreadcrumbLink,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Grid,
    Tooltip,
    GridItem,
    IconButton,
    Input,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";

export default function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const obj = [{
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }]



    return (<>

        <Tooltip hasArrow label='Message' bg='gray.300' color='black'>
            <IconButton ref={btnRef} icon={<ChatIcon />} mx={2} isRound={true} colorScheme="gray" onClick={onOpen}
                aria-label="Done"
                size={"lg"}>
                <BreadcrumbLink href="/message"></BreadcrumbLink>
            </IconButton>

        </Tooltip>

        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Message</DrawerHeader>

                <DrawerBody>
                    <Input placeholder="🔍 Search" />

                    {obj.map((x) =>
                        <Grid mt={3} mb={1} pb={16}
                            h="80px"
                            templateRows="repeat(1, 1fr)"
                            templateColumns="repeat(5, 1fr)"
                            gap={3} _hover={{
                                bgGradient: "linear(to-l, #e1e1e1, #8b8b8b)"
                            }}
                            cursor={"pointer"}
                        >
                            <GridItem rowSpan={2} colSpan={1} >
                                <Avatar src={x.avt} mt={3} ml={5}>
                                    <AvatarBadge boxSize="1.25em" bg='green.500' />
                                </Avatar></GridItem>

                            <GridItem colSpan={2} h='4' marginTop={3}>
                                <Text as={"b"} pl={2}> {x.name}
                                </Text>
                            </GridItem>

                            <GridItem colSpan={3} alignItems={"top"}>
                                <Text as={"i"} pl={2}>{x.last}
                                </Text>
                            </GridItem>

                        </Grid>)}


                </DrawerBody>


            </DrawerContent>
        </Drawer >
    </>);
}