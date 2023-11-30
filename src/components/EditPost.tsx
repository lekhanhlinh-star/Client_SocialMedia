import {
    Button,
    FormControl,
    FormLabel,
    Input,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

export const EditPost = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (<>

                        <MenuItem icon={<EditIcon/>}  onClick={onOpen}>
                            Edit
                        </MenuItem>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input ref={initialRef} placeholder='First name'/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name'/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>);
};