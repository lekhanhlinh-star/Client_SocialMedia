import Sidebar from "./Sidebar";
import { Button, Card, Container, Flex } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { off } from "process";
import { Formpost } from "./Formpost";
import ListFollowing from "./ListFollowing";
import { BiShare } from "react-icons/bi";

export function Trending() {

    return (
        <>
            <Flex letterSpacing={2} bg={"rgb(240,242,245)"}>
                <Sidebar />

                <Container alignContent={"center"}  >
                    <Card minW={500} backgroundColor={"blue"}>
                        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                            Share
                        </Button>
                    </Card>

                </Container>
                <ListFollowing />
            </Flex>
        </>
    );
}