import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { FcPanorama } from "react-icons/fc";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export function ReplyPost(data: any) {
    console.log(data)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    console.log(data)

    var check_post = false
    try {
        console.log("data", data.data.image[0].filename)
        check_post = true
    }
    catch {

    }

    var like_count = data.data.likes.length
    if (like_count == 0) {
        like_count = ""
    }



    const [dataofreply, setdataofreply] = useState<any>(null);
    const [isreply, setisreply] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.data.replyTo) {
                    await axios.get(`http://127.0.0.1:5000/api/v1/posts/${data.data.replyTo}`).then(data => {
                        console.log(data.data["data"]["doc"])
                        setdataofreply(data.data["data"]["doc"])
                        setisreply(true)
                    })
                }
            }
            catch {
            }
        };

        fetchData();
    }, []);


    const handlelike = (id: number) => {
        console.log(id)
        axios.put(`http://127.0.0.1:5000/api/v1/posts/${id}/like`);
        const button = document.getElementById(
            id.toString(),
        ) as HTMLInputElement;

        const icon = button?.querySelector('.bi-like') as HTMLElement;
        const like_c = button.textContent
        console.log(icon.style.color)


        if (icon) {
            if (icon.style.color === "black") {
                icon.style.color = "blue";
            } else {

                icon.style.color = "black";
            }
        }
    }


    const [islike, setIslike] = useState('black');



    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://127.0.0.1:5000/api/v1/posts/${data.data._id}/like`).then(data => {
                    if (data && data.data.data.isLiked) {
                        setIslike('blue')
                    }
                })

            }
            catch {
            }
        };

        fetchData();
    }, []);

    // ------------


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formDataPost, setFormDataPost] = useState({
        content: "", image: File || null,

    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        let { name, value } = event.target;
        name = "image"

        console.log("name", name)
        console.log("File changed", value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: selectedFile,
        }));

    };

    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            console.log("onSubmit")
            console.log(formDataPost);
            console.log("----loading--")
            const token = localStorage.getItem("token");

            console.log("token", token)
            console.log(`id is ${data.data._id}`)


            axios.post('http://localhost:5000/api/v1/posts', {
                content: formDataPost.content,
                image: formDataPost.image,
                replyTo: data.data._id,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
            // Reset the form
            setFormDataPost({
                content: "", image: File
            });

        } catch (e) {
            console.log(e)
        }

    }

    const navigate = useNavigate();

    const handlenav = (id: string) => {
        navigate("/post/" + id);
    }


    const profileclick = () => {
        // direct to profile
    }

    const postclick = (id: string) => {
        // handlenav(id)
        handlenav(id)
    }

    // console.log(data.postedBy["profilePic"].filename)

    return (<Card  borderTopLeftRadius="30" borderTopRightRadius="20">
        <CardHeader >
            <Flex letterSpacing={4}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar style={{ cursor: 'pointer' }} name='Segun Adebayo' src={`http://127.0.0.1:5000/uploads/${data.data.postedBy["profilePic"].filename}`} />
                    <Box>
                        <Heading size='sm'></Heading>

                        <Text style={{ cursor: 'pointer' }}>{`${data.data.postedBy["firstName"]} ${data.data.postedBy["lastName"]}`}</Text>
                    </Box>
                </Flex >
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<BsThreeDotsVertical />}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem icon={<DeleteIcon />}>
                            Delete
                        </MenuItem>
                        <MenuItem icon={<EditIcon />}>
                            Edit
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex >
        </CardHeader >
        <CardBody onClick={() => postclick(data.data._id)} style={{ cursor: 'pointer' }}>
            <Text>
                {data.data.content}
            </Text>
        </CardBody>

        {
            check_post ? (<Image
                objectFit='cover'
                src={`http://127.0.0.1:5000/uploads/${data.data.image[0].filename}`}
            />) : null
        }


        <CardFooter
            justify='space-between'
            flexWrap='wrap'
            sx={{
                '& > button': {
                    minW: '136px',
                },
            }}
        >
            <Button id={data.data._id} flex='1' variant='ghost' leftIcon={<BiLike className='bi-like' style={{ color: islike }}
            />} onClick={() => handlelike(data.data._id)}
            >
                {`Like`}
            </Button>
            {/* </Tooltip> */}

            <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={onOpen} >
                Comment
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader alignContent={"center"}>Create post</ModalHeader>
                    <form id="1" onSubmit={handleSubmit2}>

                        <ModalCloseButton />
                        <ModalBody>
                            <Avatar name='Segun Adebayo' src={`http://127.0.0.1:5000/uploads/${data.data.postedBy["profilePic"].filename}`} />

                            <Input variant='flushed' placeholder="Enter your reply"

                                name="content"
                                value={formDataPost.content}
                                onChange={handleInputChange}

                            />
                            {previewImage &&

                                <Image src={previewImage} alt="Selected Image" />}

                            <Card mt={2}>

                                <Flex m={3}>

                                    <Center>
                                        <Text m={2}>Add to your reply</Text>
                                    </Center>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Button leftIcon={<FcPanorama />} onClick={handleClickSelectFile}>Photo/video

                                    </Button>


                                </Flex>
                            </Card>


                        </ModalBody>

                        <ModalFooter>

                            <Button colorScheme='blue' mr={3} type="submit"
                                w={"full"}>
                                Post
                            </Button>

                        </ModalFooter>
                    </form>

                </ModalContent>
            </Modal>
            <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                Share
            </Button>
        </CardFooter>
    </Card >);
}