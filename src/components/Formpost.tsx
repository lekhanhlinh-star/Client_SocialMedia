import {
    Avatar,
    Button,
    Card,
    Center,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { FcPanorama } from "react-icons/fc";
import React, { useRef, useState } from "react";
import axios from "axios";



interface ProfileInfo {
    firstName: string | undefined
    lastName: string | undefined
    profilePic: string | undefined



}
export function Formpost(props: ProfileInfo) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formDataPost, setFormDataPost] = useState({
        content: "", image: File || null,

    });
    const [selectedImage, setSelectedImage] = useState<string>("https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg");

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        let { name, value } = event.target;
        name = "image";
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result as string);
                }
            };

            reader.readAsDataURL(selectedFile);
        }
        console.log("name", name);
        console.log("File changed", value);
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: selectedFile,
        }));

    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("onSubmit");
            // Perform any necessary post creation logic here
            console.log(formDataPost);
            console.log("----loading--");
            const token = localStorage.getItem("token");

            console.log("token", token);

            await axios.post("http://localhost:5000/api/v1/posts", formDataPost, {
                headers: {
                    "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response.data);
                toast({
                    title: "Create new post successful", status: "success", duration: 9000, isClosable: true, position: "top",
                });
                // window.location.reload();
            }).catch(error => {
                toast({
                    title: error.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
                });

            });
            // Reset the form
            setFormDataPost({
                content: "", image: File,
            });

        } catch (e) {
            console.log(e);
        }

    };


    return (<>
        <Card minH={"120px"} mb={3} mt={10}>


            <Flex borderRadius={"10px"}>
                <Center ml={10}>
                    <Avatar name={props.firstName} src={"http://127.0.0.1:5000/uploads/" + props.profilePic} />
                </Center>

                <Center>
                    <Input placeholder="What's happening?" size={"lg"} minW={"400px"} m={4} onClick={onOpen}

                        borderRadius={50}></Input>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader alignContent={"center"}>Create post</ModalHeader>
                            <form onSubmit={handleSubmit}>

                                <ModalCloseButton />
                                <ModalBody>
                                    <Avatar name={props.firstName} src={"http://127.0.0.1:5000/uploads/" + props.profilePic} />


                                    <Input variant="flushed" placeholder="What's on your mind now ?"

                                        name="content"
                                        value={formDataPost.content}
                                        onChange={handleInputChange}

                                    />
                                    <Image
                                        src={selectedImage}
                                        minWidth="400px" borderRadius={10}
                                        onClick={handleClickSelectFile}


                                    ></Image>

                                    <Card mt={2}>

                                        <Flex m={3}>

                                            <Center>
                                                <Text m={2}>Add to your post</Text>


                                            </Center>

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                            />
                                            <Button leftIcon={<FcPanorama />} onClick={handleClickSelectFile}>Photo/video

                                            </Button>


                                        </Flex>
                                    </Card>


                                </ModalBody>

                                <ModalFooter>

                                    <Button colorScheme="blue" mr={3} type="submit"
                                        w={"full"}>
                                        Post
                                    </Button>

                                </ModalFooter>
                            </form>

                        </ModalContent>
                    </Modal>
                </Center>
            </Flex>
            <Flex justify={"space-between"}
                alignItems="center"
                justifyContent="center" pb={5}>

                <Button leftIcon={<FcPanorama />} aria-label={"Image_post"}
                    ml={5}>Photo/video</Button>
                <Spacer />
                <Button leftIcon={<FcPanorama />}>Photo/video</Button>
                <Spacer />
                <Button mr={5} leftIcon={<FcPanorama />}>Photo/video</Button>


            </Flex>


        </Card>


    </>);
}