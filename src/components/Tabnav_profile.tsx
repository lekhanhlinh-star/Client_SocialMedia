import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

export const Tabnav_profile = () => {
    const [dataLists, setDataLists] = useState([] as any[]);
    const [offset, setOffset] = useState(0);
    const [postListComment, setpostListComment] = useState([] as any[]);
    const [activeTab, setActiveTab] = useState(0);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiEndpoints = [
                    'http://localhost:5000/api/v1/posts/postOfMe?limit=5&page=',
                    'http://localhost:5000/api/v1/posts/replyOfMe?limit=5&page='
                    
                ];
                const response = await axios.get(
                    
                    `${apiEndpoints[activeTab]}${offset}`, {
                    headers: {
                        "Content-Type": "application/json", "authorization": `Bearer ${token}`
                    },
                }

                );
                console.log("check read",response)
                const data = response.data.data.post;
                if(data){
                    setDataLists((prevPostList) => [...prevPostList, data]);
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


    const handleTabChange = (index:any) => {
        setDataLists([])
        setOffset(1); // Reset offset when changing tabs
    
        setActiveTab(index);
    };
    return (<>
        <Tabs 

    defaultIndex={0}
 index={activeTab}
 onChange={handleTabChange}
        isFitted variant='enclosed' bg={"white"} borderRadius={5}>
            <TabList mb='1em'>
                <Tab >Post</Tab>
                <Tab>Comment</Tab>
                {/* <Tab>Like</Tab> */}

            </TabList>
            <TabPanels>
                <TabPanel alignItems={"center"}>

                    <Box alignContent={"center"} alignItems={"center"}>
                        {dataLists.map((innerArray) =>
                            innerArray.map((post: any) => <Post data={post} />)
                        )}
                    </Box>

                </TabPanel>
                <TabPanel>
                <Box alignContent={"center"} alignItems={"center"}>
                        {dataLists.map((innerArray) =>
                            innerArray.map((post: any) => <Post data={post} />)
                        )}
                    </Box>


                </TabPanel>
                {/* <TabPanel>

                </TabPanel> */}
            </TabPanels>
        </Tabs>
    </>);
};