import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Post from "./Post";
import {useEffect, useState} from "react";
import axios from "axios";

export const Tabnav_profile = () => {
    const [postList, setPostList] = useState([] as any[]);
    const [offset, setOffset] = useState(1);
    const [postListComment, setpostListComment] = useState([] as any[]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/posts/postOfMe?&limit=5&page=${offset}`
                );
                 const responseComment = await axios.get(
                    `http://localhost:5000/api/v1/posts/replyOfMe?&limit=5&page=${offset}`
                );
                const data = response.data["data"]["doc"];
                const comment =   responseComment.data["data"]["doc"];
                if (comment){
                    setpostListComment((prevPostListComment) => [...prevPostListComment, comment])
                }
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
        <Tabs isFitted variant='enclosed' size={'2xl'} bg={"white"}>
            <TabList mb='1em'>
                <Tab>Post</Tab>
                <Tab>Comment</Tab>
                <Tab>Like</Tab>

            </TabList>
            <TabPanels>
                <TabPanel>
                     {postList.map((innerArray) =>
                        innerArray.map((post: any) => <Post data={post} />)
                    )}

                </TabPanel>
                <TabPanel>
                      {postListComment.map((innerArray) =>
                        innerArray.map((post: any) => <Post data={post} />)
                    )}


                </TabPanel>
                <TabPanel>

                </TabPanel>
            </TabPanels>
        </Tabs>
    </>);
};