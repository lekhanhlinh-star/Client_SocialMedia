import Header from "../components/Header"
import {MainScreen} from "../components/MainScreen";
import {Box, Center, Container, Flex, Grid, GridItem, Square, Text} from "@chakra-ui/react";
export function Home_page() {
    return (
        <>

            <Box letterSpacing={2}>
                <Header avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVKk0zTEQiVtZcvcl4gD9v2UdL0_Tp5m1BG1RXRoe3TzPOOjImMnNoFUifi2sMUPvmjU&usqp=CAU"/>



            <MainScreen/>

            </Box>



        </>

    );
}
