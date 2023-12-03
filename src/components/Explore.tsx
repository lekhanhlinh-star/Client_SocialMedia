import Sidebar from "./Sidebar";
import {
    Button,
    Card,
    Container,
    Flex,
    IconButton,
    Input,
    Stack,
    RadioGroup,
    Text,
    Radio,
    Spacer,
    useToast
} from "@chakra-ui/react";

import ListFollowing from "./ListFollowing";
import { BiShare } from "react-icons/bi";
import { CheckIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";
import Header from "./Common/Header";
import React, { useState } from "react";
import axios from "axios";
import User from "./User";

import Post from "./Post";


export function Explore() {
    const toast = useToast()
    const [use_list, setUseList] = useState([] as any[])
    const [postList, setPostList] = useState([] as any[]);
    const [input_search, setInput_search] = useState("");
    const [selectedValue, setSelectedValue] = useState('users');

    const obj = [{
        title: "Fashion accessories · Trending", content: "#BVLGARILightUpxZeeNuNew", post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending", content: "#BVLGARILightUpxZeeNuNew", post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending", content: "#BVLGARILightUpxZeeNuNew", post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending", content: "#BVLGARILightUpxZeeNuNew", post: "13.7K posts"
    }]
    const handleSearch = async () => {
        let option
        if (selectedValue === "users") {
            option = "User"

        }
        else {
            option = "Post"
        }

        await axios.get(`http://127.0.0.1:5000/api/v1/${selectedValue}?search${option}=${input_search}`)
            .then(response => {
                console.log(response)
                if (selectedValue === "users") {
                    const data = response.data["data"]["doc"];
                    console.log(data)
                    if (data) {


                        setUseList([data]);
                    }
                }
                else {
                    const data = response.data["data"]["doc"];

                    setPostList([data]);
                }

            }).
            catch(e => {
                console.log(e)
            })

        // setUseList([])


    }

    return (<>
        <Header firstName={undefined} lastName={undefined} profilePic={undefined}></Header>
        <Flex letterSpacing={2} bg={"rgb(240,242,245)"}>
            <Sidebar />
            <Container alignContent={"center"} >
                <Card minW={500} marginTop={5}>
                    <Flex mt={22}>
                        <Input margin={15} placeholder='🔍 Search' borderRadius={25} onChange={e => {
                            setInput_search(e.target.value)
                        }}>
                        </Input>

                        <IconButton
                            onClick={handleSearch}


                            isRound={true}
                            variant='solid'
                            colorScheme='teal'
                            aria-label='Done'
                            fontSize='20px'
                            icon={<Search2Icon />}
                            margin={15}
                        />

                    </Flex>
                    <Flex mb={10}>
                        <Spacer />
                        <RadioGroup defaultValue='2' value={selectedValue} onChange={setSelectedValue}>
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='red' value='users'>
                                    User
                                </Radio>
                                <Radio colorScheme='green' value='posts'>
                                    Post
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        <Spacer />

                    </Flex>
{/* 

                    <Flex direction="column" style={{ cursor: 'pointer' }}>
                        <Text align={"left"} as='b' pb={5} marginLeft={15} fontSize={15}>Trends</Text>
                        {obj.map((x) => <Flex direction="column" paddingLeft={15} py={3} _hover={{
                            bgGradient: "linear(to-l, #e1e1e1, #8b8b8b)"
                        }}>
                            <Text align={"left"} fontSize={11}>{x.title}</Text>
                            <Text align={"left"} as='b' fontSize={13}>{x.content}</Text>
                            <Text align={"left"} fontSize={11}>{x.post}</Text>


                        </Flex>)}

                        <Text align={"left"} fontSize={14} paddingLeft={15} py={3} _hover={{
                            bgGradient: "linear(to-l, #e1e1e1, #8b8b8b)"
                        }}>Show more</Text>

                    </Flex> */}

                </Card>
                <Container mt={10}>

                    {
                        use_list.map((innerArray) =>
                            innerArray.map((user: any) => <User id={user._id} lastName={user.lastName} firstName={user.firstName} profilePic={user.profilePic?.filename} ></User>)
                        )}
                    {postList.map((innerArray) =>
                        innerArray.map((post: any) => <Post data={post} />)
                    )}

                    {/* <User />
                    <User />
                    <User />
                    <User />
                    <User /> */}
                </Container>

            </Container>

            <ListFollowing />
        </Flex>
    </>);
}