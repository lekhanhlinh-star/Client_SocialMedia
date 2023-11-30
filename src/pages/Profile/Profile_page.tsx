import Header from "../../components/Common/Header";
import {Tabnav_profile} from "../../components/Tabnav_profile";
import {Box, Container, Flex, Spacer} from "@chakra-ui/react";
import {Formpost} from "../../components/Formpost";
import CoverPicture from "../../components/Profile/CoverPicture";
import Sidebar from "../../components/Sidebar";

export function Profile_page() {
    return (<>
                   <Header firstName={""} lastName={""} profilePic={""}/>

        <Flex bg={"white"} height={5}>

            <Sidebar/>



        </Flex>

        <Box bg={"gray.200"} alignItems={"center"}>
            <CoverPicture></CoverPicture>

        </Box>

        <Flex bg={"white"} height={150}>

        </Flex>


        <Flex letterSpacing={3} bg={"gray.200"}>


            <Container mt={5} size={"xl"}>



                {/*<Formpost/>*/}
                {/*<Tabnav_profile></Tabnav_profile>*/}

            </Container>
        </Flex>

    </>);
}