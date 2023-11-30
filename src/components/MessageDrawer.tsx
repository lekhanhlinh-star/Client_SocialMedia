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
import {ChatIcon} from "@chakra-ui/icons";

export default function DrawerExample() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef(null);

    return (<>

        <Tooltip hasArrow label='Message' bg='gray.300' color='black'>
            <IconButton ref={btnRef} icon={<ChatIcon/>} mx={2} isRound={true} colorScheme="gray" onClick={onOpen}
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
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Message</DrawerHeader>

                <DrawerBody>
                    <Input placeholder="Type here..."/>


                    <Grid my={7}
                        h="40px"
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={1} > <Avatar my={2} src={"http://localhost:5000/uploads/1700728918737.jpg"}>
                            <AvatarBadge boxSize="1.25em" bg='green.500'  />
                        </Avatar></GridItem>
                        <GridItem colSpan={4} > <Text as={"b"} mt={2} ml={2}> User name


                        </Text>
                        </GridItem>
                        <GridItem colSpan={4}> <Text as={"i"} mt={2} ml={2}> least messages


                        </Text>
                        </GridItem>
                    </Grid>
                    <Grid my={7}
                        h="40px"
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={1} > <Avatar my={2} src={"http://localhost:5000/uploads/1700728918737.jpg"}>
                            <AvatarBadge boxSize="1.25em" bg='green.500'  />
                        </Avatar></GridItem>
                        <GridItem colSpan={4} > <Text as={"b"} mt={2} ml={2}> User name


                        </Text>
                        </GridItem>
                        <GridItem colSpan={4}> <Text as={"i"} mt={2} ml={2}> least messages


                        </Text>
                        </GridItem>
                    </Grid>



                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>);
}