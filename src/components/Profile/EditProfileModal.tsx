import {
    Avatar,
    Button,
    Container,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Spacer,
    Stack,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {CloseIcon, EditIcon} from "@chakra-ui/icons";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface ProfileInfo {
    firstName: string;
    lastName: string;

}

export const EditProfileModal = () => {
    const [profileinfo, setProfileinfo] = useState({
        firstName: "", lastName: ""
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
      setProfileinfo((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };
    const token = localStorage.getItem("token");
    const toast = useToast();
    useEffect(() => {
        // Create a separate function for fetching data
        const fetchProfileInfo = async () => {
            try {
                await axios.get("http://localhost:5000/api/v1/users/me", {
                    headers: {
                        "Content-Type": "multipart/form-data", "authorization": `Bearer ${token}`,
                    },
                }).then(response => {
                    const dataUser: ProfileInfo = response.data.data.doc;

                    setProfileinfo(dataUser);


                }).catch(error => {


                });

            } catch (error) {
                console.error(error);
            }
        };

        // Call the fetch function
        fetchProfileInfo();
    }, []);


    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [EditProfileData, setEditProfileData] = useState();
    const [value, setValue] = React.useState("1");


    return (<>
        <Button onClick={onOpen} leftIcon={<EditIcon/>} ml={80} colorScheme="twitter">Edit profile</Button>

        <Modal

            isOpen={isOpen}
            onClose={onClose}

        >
            <ModalOverlay/>
            <ModalContent width={"700px"}>
                <ModalHeader>Edit profile</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>


                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input ref={initialRef} name={"firstName"} value={profileinfo?.firstName || ""}
                               onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input value={profileinfo?.lastName || ""}  name={"lastName"} onChange={handleInputChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Birth day</FormLabel>
                        <Input type={"date"}/>
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
};