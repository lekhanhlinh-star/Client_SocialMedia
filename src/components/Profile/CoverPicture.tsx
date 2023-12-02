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
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { EditCoverPicModal } from "./EditCoverPicModal";
import { EditProfileModal } from "./EditProfileModal";
import { useParams } from "react-router-dom";
import { FollowShow } from "./Follow";

interface ProfileInfo {
    firstName: string;
    lastName: string;
    profilePic: { filename: string };
    coverPhoto: { filename: string };
    role: string;
    likes: any[]; // Update the type based on your actual data structure
    retweets: any[]; // Update the type based on your actual data structure
    followers: any[]; // Update the type based on your actual data structure
    _id: string
}

const CoverPicture = () => {


    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<string>("https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg");
    let [file, setFile] = useState<File | null>(null);
    const token = localStorage.getItem("token");

    const [profileinfo, setProfileinfo] = useState<ProfileInfo | undefined>(undefined);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Create a separate function for fetching data
        const fetchProfileInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/users/me", {
                    headers: {
                        "authorization": `Bearer ${token}`,
                    },
                });
                const dataUser: ProfileInfo = response.data.data.doc;
                setProfileinfo(dataUser);
            } catch (error) {
                console.error(error);
            }
        };

        // Call the fetch function
        fetchProfileInfo();
    }, []);

    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ImageAI, setImageAI] = useState<File>();
    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    };

    const handle_save_picture = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.error(file);
        const data = {
            "profilePic": file
        };
        console.log("data iamge", data)


        await axios.patch("http://localhost:5000/api/v1/users/profilePicture", data, {
            headers: {
                "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
            },

        }).then(response => {
            console.log(response)
            toast({
                title: "Updated profile avatar", status: "info", duration: 9000, isClosable: true, position: "top",
            });
            onClose();
            window.location.reload();

        }).catch(e => {
            toast({
                title: e.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
            });


        });


    };

    const handle_click_generate = async () => {

        if (file) {
            setLoading(!loading);
            const data = {
                "file": file
            }
            await axios.post("http://localhost:8000/api/v1/generateAI", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }, responseType: 'blob'


            }).then(response => {
                if (response.status === 200) {
                    // Get the Content-Type header value

                    // Check if the Content-Type is of a specific type, for example, 'application/json'
                    const contentType = response.headers['content-type'];

                    // Check if the Content-Type is 'image/png'
                    if (contentType && contentType.includes('image/png')) {
                        const filename = "output.png"
                        const blob = new Blob([response.data], { type: "image/png" });
                        const fileAI = new File([blob], filename, { type: "image/png" });

                        setImageAI(fileAI)
                        setFile(fileAI)
                        setLoading(!loading);

                    } else {
                        // Handle other content types
                        console.log(`Unhandled content type: ${contentType}`);
                    }
                } else {
                    // Handle non-OK response status
                    console.error(`Request failed with status: ${response.status}`);
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }



    console.log(profileinfo?.profilePic.filename);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        console.log(selectedFile);

        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result as string);
                }
            };

            reader.readAsDataURL(selectedFile);
        }

    };

    console.log(profileinfo)
    return (
        <Box bg={"white"} mt={2} >
            <Container
                bgSize="cover"
                bgPosition="center"
                height="500px"
                width="100%"
                position={"relative"}
                justifyContent={"center"}
                bg={"white"}

            >
                <EditCoverPicModal data={profileinfo?.coverPhoto.filename} />
                <AspectRatio ratio={16 / 9}>

                    <Image
                        src={"http://localhost:5000/uploads/" + profileinfo?.coverPhoto.filename}
                        minWidth="800px" maxWidth="800px" borderRadius={10} minHeight="500px" maxH={"500px"}


                    ></Image>
                </AspectRatio>


                <Flex position={"absolute"} zIndex={900} bottom={-170} pr={170} justifyContent={"center"}
                    borderRadius={8}>
                    <VStack
                        divider={<StackDivider />}
                        spacing={3}
                        align="stretch"
                    >
                        <Flex justifyItems={"center-space"} alignItems={"center"}>
                            <Modal
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay px={90}>
                                    <ModalContent>
                                        <ModalHeader ml={0}>Edit profile</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                            {ImageAI ? (<Image
                                                src={URL.createObjectURL(ImageAI)}
                                                minWidth="400px"
                                                borderRadius={10}
                                            />) : (<Image
                                                src={selectedImage}
                                                minWidth="400px" borderRadius={10}
                                                onClick={handleClickSelectFile}


                                            ></Image>)}


                                        </ModalBody>

                                        <ModalFooter>
                                            <CircularProgress
                                                isIndeterminate
                                                color='green.300'
                                                style={{ visibility: loading ? 'visible' : 'hidden' }}
                                            />

                                            <Button colorScheme={"red"} mr={4} onClick={handle_click_generate}>Create
                                                generate anime </Button>
                                            <Button colorScheme="blue" mr={3} onClick={handle_save_picture}>
                                                Save
                                            </Button>
                                            <Button onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </ModalOverlay>
                            </Modal>


                            <Avatar size="xl" name="Segun Adebayo" onClick={onOpen}
                                src={"http://localhost:5000/uploads/" + profileinfo?.profilePic.filename} />
                            <Heading ml={4} size="lg">{profileinfo?.firstName + " " + profileinfo?.lastName}</Heading>
                        </Flex>


                        <Box width={"500px"}>
                            <Flex minWidth="max-content" alignItems="center" gap="2">
                                <Box p="2">
                                    <Heading size="md">Chakra App</Heading>
                                </Box>
                                <Spacer />


                                <ButtonGroup gap="1">


                                    <EditProfileModal></EditProfileModal>

                                </ButtonGroup>
                            </Flex>

                            <Flex minWidth="max-content" gap="2">
                                <FollowShow data={{
                                    id: profileinfo?._id,
                                }} />



                                <Spacer />


                            </Flex>


                        </Box>
                    </VStack>


                </Flex>


            </Container>
        </Box >


    );

}

export default CoverPicture;