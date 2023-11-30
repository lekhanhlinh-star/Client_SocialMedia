import Sidebar from "./Sidebar";
import { Button, Card, Container, Flex, IconButton, Input, Text } from "@chakra-ui/react";

import ListFollowing from "./ListFollowing";
import { BiShare } from "react-icons/bi";
import { CheckIcon, SettingsIcon } from "@chakra-ui/icons";
import Header from "./Common/Header";

export function Explore() {
    const obj = [{
        title: "Fashion accessories · Trending",
        content: "#BVLGARILightUpxZeeNuNew",
        post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending",
        content: "#BVLGARILightUpxZeeNuNew",
        post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending",
        content: "#BVLGARILightUpxZeeNuNew",
        post: "13.7K posts"
    }, {
        title: "Fashion accessories · Trending",
        content: "#BVLGARILightUpxZeeNuNew",
        post: "13.7K posts"
    }]

    return (
        <>
            <Header firstName={undefined} lastName={undefined} profilePic={undefined}></Header>
            <Flex letterSpacing={2} bg={"rgb(240,242,245)"} >
                <Sidebar />
                <Container alignContent={"center"}  >
                    <Card minW={500} marginTop={5} >
                        <Flex mt={22}>
                            <Input margin={15} placeholder='🔍 Search' borderRadius={25}>
                            </Input>
                            <IconButton
                                isRound={true}
                                variant='solid'
                                colorScheme='teal'
                                aria-label='Done'
                                fontSize='20px'
                                icon={<SettingsIcon />}
                                margin={15}
                            />
                        </Flex>
                        <Flex direction="column" style={{ cursor: 'pointer' }}>
                            <Text align={"left"} as='b' pb={5} marginLeft={15} fontSize={15} >Trends</Text>
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

                        </Flex>
                    </Card>
                </Container>
                <ListFollowing />
            </Flex>
        </>
    );
}