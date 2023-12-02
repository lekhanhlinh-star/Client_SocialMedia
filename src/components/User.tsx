import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Avatar, Flex, Box, useColorModeValue } from '@chakra-ui/react'

interface ProfileInfo {
    id: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    profilePic: string | undefined




}
export default function User(props: ProfileInfo) {



    return (
        <>
            <Card

            >



                <CardBody>
                    <Box
                        as="a"
                        href={"/profile/" + props.id}
                        style={{ textDecoration: 'none' }}
                        _focus={{ boxShadow: 'none' }}
                    >
                        <Flex
                            align="center"
                            p="4"
                            mx="4"
                            mt={3}
                            borderRadius="lg"
                            role="group"
                            cursor="pointer"
                            _hover={{
                                bg: "rgb(215,36,141)", color: 'white',
                                bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
                            }}
                        >
                            <Avatar src={"http://127.0.0.1:5000/uploads/" + props.profilePic} mr={5}></Avatar>
                            <Text fontSize={"20px"}> {props.firstName + " " + props.lastName} </Text>


                        </Flex>
                    </Box>


                </CardBody>

            </Card>

        </>
    )
}