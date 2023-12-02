import { Avatar, Button, Container, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, Box } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";


export function FollowShow(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure(data.onOpen);
    const [getdata, setgetdata] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/v1/users/${data.data.id}/following`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": `Bearer ${token}`,
                    },
                });
                console.log(response);
                setgetdata(response.data.data.following.following);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [data.data.id]);

    console.log(getdata);

    return (
        <>
            <Box m={2} onClick={onOpen}>
                <Text as="i" fontSize="md" _hover={{ textDecoration: "underline", cursor: "pointer" }} >
                    <Text fontSize="md" as="b" color="tomato" >
                        1
                    </Text> Following</Text>
            </Box>

            <Box m={2} onClick={onOpen}>
                <Text as="i" fontSize="md" _hover={{ textDecoration: "underline", cursor: "pointer" }} >
                    <Text fontSize="md" as="b" color="tomato" >
                        1
                    </Text > Followers
                </Text>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={600}>
                    <ModalCloseButton />
                    <ModalHeader>Name</ModalHeader>
                    <ModalBody>
                        <Tabs isFitted variant="soft-rounded" colorScheme="gray">
                            <TabList mb="1em">
                                <Tab ml={3}>Following</Tab>
                                {/* <Tab mr={3}>Followers</Tab> */}
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {
                                        getdata.map((x) =>
                                            <Flex direction="column" >
                                                <Flex pt={1} >
                                                    <Flex borderRadius={40} _hover={{ backgroundColor: "gray.200" }} minW={420}>
                                                        <Avatar size="lg" mt={1} name={x.firstName}
                                                            src="http://localhost:5000/uploads/" />
                                                        <Flex ml={5} color="black" direction="column">
                                                            <Text mt={6}>{x.firstName} {x.lastName}</Text>
                                                            {/* <Text>@something</Text>
                                                            <Text>Descript</Text> */}
                                                        </Flex></Flex>
                                                    <Button size="md" ml={"auto"} borderRadius={40} px={5} mt={4}>
                                                        Follow
                                                    </Button>
                                                </Flex>
                                            </Flex>)
                                    }



                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                </ModalContent>
            </Modal >
        </>
    );
}