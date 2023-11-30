import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    StackDivider,
    Text,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";

import axios from "axios";
import {useParams} from "react-router-dom";

interface ProfileInfo {
    firstName: string|undefined;
    lastName: string|undefined;
    profilePic: string|undefined ;
    coverPhoto: string|undefined ;


}

const CoverPicClient = (props:ProfileInfo) => {


    return (


        <Box bg={"white"} mt={2}>

            <Container
                bgSize="cover"
                bgPosition="center"
                height="500px"
                width="100%"
                position={"relative"}
                justifyContent={"center"}
                bg={"white"}

            >

                <AspectRatio ratio={16 / 9}>

                    <Image
                        src={"http://localhost:5000/uploads/" +   props.coverPhoto}
                        minWidth="800px" maxWidth="800px" borderRadius={10} minHeight="500px" maxH={"500px"}

                    ></Image>
                </AspectRatio>


                <Flex position={"absolute"} zIndex={900} bottom={-165} pr={170} justifyContent={"center"}
                      borderRadius={8}>
                    <VStack
                        divider={<StackDivider/>}
                        spacing={3}
                        align="stretch"
                    >
                        <Flex justifyItems={"center-space"} alignItems={"center"}>

                            <Avatar size="xl" name="Segun Adebayo"
                                    src={"http://localhost:5000/uploads/" +props.profilePic}/>
                            <Heading size="lg">{props.firstName + " " + props.lastName}</Heading>
                        </Flex>


                        <Box width={"500px"}>
                            <Flex minWidth="max-content" alignItems="center" gap="2">
                                <Box p="2">
                                    <Heading size="md">Chakra App</Heading>
                                </Box>
                                <Spacer/>

                                <ButtonGroup gap="1">

                                </ButtonGroup>
                            </Flex>

                            <Flex minWidth="max-content" gap="2">
                                <Box p="2">

                                    <Text as="i" fontSize="md">
                                        <Text fontSize="md" as="b" color="tomato">
                                            1
                                        </Text> Following</Text>
                                </Box>
                                <Box p="2">
                                    <Text as="i" fontSize="md">
                                        <Text fontSize="md" as="b" color="tomato">
                                            1
                                        </Text> Followers</Text>
                                </Box>
                                <Spacer/>
                                <Button > Follow</Button>


                            </Flex>


                        </Box>
                    </VStack>


                </Flex>


            </Container>
        </Box>


    );

}

export default CoverPicClient;