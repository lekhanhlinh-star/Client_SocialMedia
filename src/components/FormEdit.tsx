import {
    Avatar,
    Button,
    Card,
    Center,
    Flex,
    Image,
    Input,
    MenuItem,
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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'


export function FormEdit(data: any) {

    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(false);
    };
    console.log(data)
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formDataPost, setFormDataPost] = useState({
        content: data.data.content, image: File || null,

    });

    const [selectedImage, setSelectedImage] = useState<string>(data?.data?.image[0]?.filename
        ? `http://127.0.0.1:5000/uploads/${data.data.image[0].filename}`
        : "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg");


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

    const DeletePhoto = () => {
        setSelectedImage("https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg")
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("onSubmit");
            // Perform any necessary post creation logic here
            console.log(formDataPost);
            console.log("----loading--");
            const token = localStorage.getItem("token");

            console.log("token", token);

            axios.patch(`http://localhost:5000/api/v1/posts/${data.data._id}`, formDataPost, {
                headers: {
                    "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response.data);
                toast({
                    title: "Edit successful", status: "success", duration: 9000, isClosable: true, position: "top",
                });
                window.location.reload();
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
        <Card  >
            <Flex >
                <Center>
                    <Modal isOpen={isOpen} onClose={handleClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader alignContent={"center"}>Create post</ModalHeader>
                            <form onSubmit={handleSubmit}>

                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex>
                                        <Avatar name={data.data.postedBy.firstName} src={"http://127.0.0.1:5000/uploads/" + data.data["postedBy"].profilePic.filename} />
                                        <Text fontWeight="bold" ml={5} mt={2} fontSize={19} >{data.data.postedBy.firstName} {data.data.postedBy.lastName}</Text>
                                    </Flex>


                                    <Input variant="flushed"
                                        name="content"
                                        defaultValue={data.data.content}
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
                                                <Text m={2}>Options</Text>
                                            </Center>

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                            />
                                            <Button mr={5} leftIcon={<FcPanorama />} onClick={handleClickSelectFile}>Photo/video
                                            </Button>
                                            <Button ml={0} leftIcon={<DeleteIcon />} onClick={DeletePhoto}>Delete
                                            </Button>
                                        </Flex>
                                    </Card>


                                </ModalBody>

                                <ModalFooter>

                                    <Button colorScheme="blue" mr={3} type="submit"
                                        w={"full"}>
                                        Update
                                    </Button>

                                </ModalFooter>
                            </form>

                        </ModalContent>
                    </Modal>
                </Center>
            </Flex>


        </Card>


    </>);
}