import Sidebar from "./Sidebar";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { off } from "process";
import { Formpost } from "./Formpost";
import ListFollowing from "./ListFollowing";


interface ProfileInfo {
    firstName: string | undefined
    lastName: string | undefined
    profilePic: string | undefined



}
export function MainScreen(props: ProfileInfo) {
    const [postList, setPostList] = useState([] as any[]);
    const [offset, setOffset] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                console.log("token", token);
                const response = await axios.get(
                    `http://localhost:5000/api/v1/posts?limit=5&page=${offset}`, {
                    headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },

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



    return (
        <>
            <Flex letterSpacing={2} bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")}
                overflow={"hidden"}>
                <Sidebar />

                <Container alignContent={"center"}  >
                    <Formpost lastName={"Linh"} firstName={"Le"}
                        profilePic={props.profilePic} />
                    {postList.map((innerArray) =>
                        innerArray.map((post: any) => <Post data={post} />)
                    )}
                </Container>
                <ListFollowing />
            </Flex>
        </>
    );
}