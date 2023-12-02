import { Box, Button, Center, Container, Flex, Grid, Text, GridItem, Square, Tab, TabList, TabPanel, TabPanels, Tabs, Input, DrawerBody, Avatar, AvatarBadge, Spacer, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { BiSend } from "react-icons/bi";


export function Message() {
    const [currentid, setcurrentid] = useState('')

    const obj = [{
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu",
        avt: "http://localhost:5000/uploads/1700827287066.jpeg",
        last: "last 1",
        id: "65544fb50870434af07d0f66"
    }]

    const mess = [{
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.",
    }]

    return (
        <Flex color='white' h="100vh">
            <Box minW='70' maxW='80' border="1px" borderColor="#b9c9c9">
                <Flex direction="column" backgroundColor={"white"} >
                    <Button my={2} backgroundColor={"white"} size="lg">💬</Button>
                    <Button my={2} backgroundColor={"white"} size="lg">👥</Button>
                    <Button my={2} backgroundColor={"white"} size="lg">🏛️</Button>
                    <Spacer />
                    <Avatar ml={3} marginTop={500} mt="auto" alignItems={"bottom"}></Avatar>
                </Flex>
            </Box>
            <Box minW='350' border="1px" borderColor="#b9c9c9" overflowY="auto"
                __css={{
                    '&::-webkit-scrollbar': {
                        w: '2',
                    },
                    '&::-webkit-scrollbar-track': {
                        w: '6',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '10',
                        bg: `gray.100`,
                    },
                }}>
                <Flex direction="column" >
                    <Flex >
                        <Text color={"black"} as={"b"} ml={5} mt={3}>Chat</Text>
                        <Button mt={1} backgroundColor={"white"} ml={"auto"} marginRight={3}>✍🏻</Button>
                    </Flex>

                    <Input ml={5} mt={5} placeholder="Search" color={"black"} w={300} borderRadius={30}></Input>

                    <Flex direction="column" >

                        {obj.map((x) =>
                            <Flex my={1} pb={2} _hover={{
                                bgGradient: "linear(to-l, #e1e1e1, #8b8b8b)"

                            }}
                                cursor={"pointer"}>
                                <Avatar src={""} mt={3} ml={5}>
                                    <AvatarBadge boxSize="1.5em" bg='green.500' />
                                </Avatar>
                                <Flex direction="column" color={"black"}>
                                    <Text as={"b"} pl={2} mt={3} fontSize={15}> {x.name}</Text>
                                    <Text as={"i"} pl={0} fontSize={15}>{x.last}</Text>
                                </Flex>
                            </Flex>
                        )}


                    </Flex>

                </Flex>
            </Box>


            <Box flex='1' border="1px" borderColor="#b9c9c9" color={"black"} overflowY="auto"
                __css={{
                    '&::-webkit-scrollbar': {
                        w: '2',
                    },
                    '&::-webkit-scrollbar-track': {
                        w: '6',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '10',
                        bg: `gray.100`,
                    },
                }} >
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-end"  >
                    <Flex position="absolute" bottom={0} backgroundColor="white" width="-webkit-fill-available" mt={20} >
                        <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}>➕</Button>
                        <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}>➕</Button>
                        <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}>➕</Button>
                        <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}>➕</Button>

                        <Input backgroundColor="white" mr={3} border="1px" borderColor="#b9c9c9" textColor={"gray"} color={"gray"} width="100%" display="flex" placeholder="Enter your reply" borderRadius={50}  ></Input>

                        <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}>😋</Button>
                        {/* <Button backgroundColor="white" color={"gray"} minW={5} display="flex" px={5} borderRadius={50}></Button> */}
                        <IconButton
                            variant='outline'
                            colorScheme='teal'
                            aria-label='Call Sage'
                            fontSize='20px'
                            px={3}
                            mr={1}
                            icon={<BiSend />}
                        />

                    </Flex>
                    {mess.map((x) => (
                        <Box
                            bottom={0}
                            textAlign="start"
                            mx={2}
                            maxW={800}
                            my={1}
                            borderRadius="30"
                            mr="auto"
                            bg="tomato"
                            w="fit-content"
                            px={7}
                            py={2}


                            fontSize={15}
                        >
                            {x.content}
                        </Box>
                    ))}
                    {mess.reverse().map((x) => (
                        <Box
                            bottom={0}
                            textAlign="start"
                            mx={2}
                            maxW={800}
                            my={1}
                            borderRadius="30"
                            ml="auto"
                            bg="tomato"
                            w="fit-content"
                            px={7}
                            py={2}
                            fontSize={15}
                        >
                            {x.content}
                        </Box>
                    ))}
                </Flex>
            </Box>
        </Flex >
    );
}