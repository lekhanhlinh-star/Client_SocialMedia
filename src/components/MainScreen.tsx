import Sidebar from "./Sidebar";
import {Container, Flex} from "@chakra-ui/react";
import {Formpost} from "./Formpost";
import axios from 'axios';
import {useState} from "react";
import Post from "./Post";
export function MainScreen() {
    const [postList, setPostList] = useState([]);
    axios.get("http://localhost:5000/api/v1/posts").then(response => {
        setPostList(response.data["data"]["doc"]);
        console.log("check",response.data["data"]["doc"]);
    }).catch(error => {
        console.log(error);
    })
    return (<>

        <Flex letterSpacing={2}>
            <Sidebar/>


            <Container>
                <Formpost></Formpost>
                {postList.map((post) => (
                   <Post data={post}/>
                ))}


            </Container>

        </Flex>

    </>);
}