import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Post from "./Post";

export const Tabnav_profile = () => {
    return (<>
        <Tabs isFitted variant='enclosed' size={'2xl'} bg={"white"}>
            <TabList mb='1em'>
                <Tab>Post</Tab>
                <Tab>Comment</Tab>
                <Tab>Like</Tab>

            </TabList>
            <TabPanels>
                <TabPanel>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </TabPanel>
                <TabPanel>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </TabPanel>
                <TabPanel>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>);
};