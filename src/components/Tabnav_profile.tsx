import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

export const Tabnav_profile = () => {
    const [postList, setPostList] = useState([] as any[]);
    const [offset, setOffset] = useState(1);
    const [postListComment, setpostListComment] = useState([] as any[]);

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/posts/postOfMe?limit=5&page=${offset}`, {
                    headers: {
                        "Content-Type": "application/json", "authorization": `Bearer ${token}`
                    },
                }

                );
                const data = response.data["data"]["doc"];
                if (data) {
                    setPostList((prevPostList) => [...prevPostList, data]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [offset]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const currentHeight =
                document.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 1 >= scrollHeight) {
                setOffset((prevOffset) => prevOffset + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (<>
        <Tabs isFitted variant='enclosed' bg={"white"} borderRadius={5}>
            <TabList mb='1em'>
                <Tab>Post</Tab>
                <Tab>Comment</Tab>
                <Tab>Like</Tab>

            </TabList>
            <TabPanels>
                <TabPanel alignItems={"center"}>

                    <Box alignContent={"center"} alignItems={"center"}>
                        {postList.map((innerArray) =>
                            innerArray.map((post: any) => <Post data={post} />)
                        )}
                    </Box>

                </TabPanel>
                <TabPanel>



                </TabPanel>
                <TabPanel>

                </TabPanel>
            </TabPanels>
        </Tabs>
    </>);
};