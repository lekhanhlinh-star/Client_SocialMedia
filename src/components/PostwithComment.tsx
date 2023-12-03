import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,

    Text,
    useDisclosure
} from "@chakra-ui/react"
import { FcPanorama } from "react-icons/fc";
import { useEffect, useState } from "react";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat, BiLike, BiShare } from "react-icons/bi";
import Header from "./Common/Header"
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

export function PostWithComment() {
    const id = useParams();
    // http://localhost:5000/api/v1/posts
    console.log("---")
    const token = localStorage.getItem("token");

    const [main_post, setmain_post] = useState<any>();

    const [comment, setcomment] = useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://127.0.0.1:5000/api/v1/posts/${id.id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data', 'authorization': `Bearer ${token}`,
                    },
                }).then(data => {
                    if (data) {
                        setmain_post(data.data["data"]["doc"])
                        //   console.log("check_data",data.data.data["doc"])
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            catch {
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://127.0.0.1:5000/api/v1/posts?replyTo=${id.id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': `Bearer ${token}`,
                    },
                }).then(data => {
                    if (data) {
                        console.log("check_data",data.data.data["doc"])
                        setcomment(data.data.data["doc"])
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            catch {
            }
        };

        fetchData();
    }, []);

    if (!main_post) {
        return (<div></div>)
    }

    var check_post = false
    try {
        console.log("data", main_post.image[0]?.filename)
        check_post = true
    }
    catch {

    }
    console.log("main_post")

    console.log(comment)


    return (
        <>
            <Header lastName={"Linh"} firstName={"Le"}
                                    profilePic={""} />
            <Flex letterSpacing={2}>
                <Sidebar />

                <Container alignContent={"center"}>
                    <Card  my={5}>
                        <CardHeader >
                            <Flex letterSpacing={4}>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar style={{ cursor: 'pointer' }} name='Segun Adebayo' src={`http://127.0.0.1:5000/uploads/${main_post.postedBy["profilePic"]?.filename}`} />
                                    <Box>
                                        <Heading size='sm'></Heading>

                                        <Text style={{ cursor: 'pointer' }}>{`${main_post.postedBy["firstName"]} ${main_post.postedBy["lastName"]}`}</Text>
                                    </Box>
                                </Flex >
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </Flex >
                        </CardHeader >
                        <CardBody >
                            <Text>
                                {main_post.content}
                            </Text>
                        </CardBody>

                        {check_post && main_post && main_post.image && main_post.image[0] && (
    <Image
        minW={"400px"}
        minH={"400px"}
        objectFit='cover'
        src={`http://127.0.0.1:5000/uploads/${main_post.image[0]?.filename}`}
    />
)}
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                            <Button id={main_post._id} flex='1' variant='ghost' leftIcon={<BiLike className='bi-like'
                            />}
                            >
                                {`Like`}
                            </Button>

                            <Button flex='1' variant='ghost' leftIcon={<BiChat />}  >
                                Comment
                            </Button>

                            <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                                Share
                            </Button>
                        </CardFooter>

                        <Card >
                            <Flex ml={5} margin={5} letterSpacing={4} >

                                <Avatar style={{ cursor: 'pointer' }} name='Segun Adebayo' src={`http://127.0.0.1:5000/uploads/${main_post.postedBy["profilePic"]?.filename}`} />
                                <Input ml={5} minH={45} ></Input>
                                <Button marginLeft={2} minH={45} minW={20} flex='1' variant='ghost' >
                                    Post
                                </Button>
                            </Flex>

                        </Card>

                        <Card>

                            {comment.map((commentItem: any, index: any) => (
                                <Flex key={index} ml={5} margin={5} letterSpacing={4}>
                                    <Avatar
                                        style={{ cursor: 'pointer' }}
                                        name='Segun Adebayo'
                                        src={`http://127.0.0.1:5000/uploads/${commentItem.postedBy["profilePic"]?.filename}`}
                                    />

                                    <Flex direction="column" marginLeft={5}>
                                        <Text fontSize={15} align="left" fontWeight="bold" style={{ cursor: 'pointer' }}>
                                            {`${commentItem.postedBy["firstName"]} ${commentItem.postedBy["lastName"]}`}
                                        </Text>
                                        <Text fontSize={15} whiteSpace="pre-line" align={"left"}>
                                            {commentItem.content}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ))}

                        </Card>
                    </Card >
                </Container>
            </Flex>
        </>

    );

}