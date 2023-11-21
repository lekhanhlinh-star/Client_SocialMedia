import {Avatar, Box, Button, ButtonGroup, Flex, Heading, Image, Spacer, StackDivider, VStack} from "@chakra-ui/react";
import React, {useRef} from "react";
import {EditIcon} from "@chakra-ui/icons";

const CoverPicture = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        console.log(selectedFile)

    };

    return (


        <Box bg={"white"}>

            <Flex
                bgSize="cover"
                bgPosition="center"
                height="400px"
                width="100%"
                position={"relative"}
                justifyContent={"center"}
                bg={"white"}


            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />

                <Image
                    src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAElBMVEXy8vL////6+vr19fX4+Pj8/Px/aeudAAACoklEQVR4nO3c227bMBBF0cgk//+XGwu6kRxeRnFaVGevt8a2AG3QQ0kN8vUFAAAAAAAAAAAAAAAAAAAAAACAv2j5Ba9/fVK/hVgOxHL4Prf0+qD08FgfPbfw8Fjpk8cjlgOxHIjlQCwHYjlIxgoh3DqeXqyQbl+Ky8VK551L9B5PLFb40X2eWKyf3RVrxUpFrMU36KVihbKV88pCKtarfjzlWlpSsepWvh1RPZbr3JVi1SPLObSUYlkri1g7ZpZDGau6zGI3PJWxjKHV+3gqv6NSsXxX8KkqoxWrXFq98R7rkaYVq6jVaxWMpScWK6vVPW9rqKnF2r5e71e6G6G5+vRifZ9zjHFwyZDM9acYayx7PHEOeWIZ4pI5ViGxatW16/UFYlUfsy/HiFUx7iC3oxCrZDx73oc8sQrRarUNeWLlrKepx5AnVqbZaq0lHytmd3/tVu8jqccK2VuMjfA65NVjLdf3mBvhKYjHStuaWTU2wkst6Vj71+64MBiTjXV+7cL2dmK1XJdS+W9i5bI2qfoJsYpXy1rDEa8aq7ymitYPibWqr6nWIT+spRjL+sJNbYmCsexR3n5FOpYdYmZL1IvVmkxrif6WKBerPcXHW6JarN7SGW6JYrH6Q2m0JYrF6rYabolasQatRluiVKzJG5rmXFOKNXhyvOpuiUKxJh4rLP0tUSfW3JPj7ddm1GNNtuptiTKxxsN9194SVWLNDPesifUBkVhzw33X2hI1Ys0O911jS9SI5WzVukuUiDU/3A/vj1XrUSHWjVb2/44JxPJshEWYl/GzJzpieYf7ztgSHx/rbitrS3x8rDsDa7MeJ+0UYn2K9i+zOT09Fn8ueNbCH6Ked3+utxGLWMQCAAAAAAAAAAAAAAAAAAAAAAD4//0BUyATTom0AxcAAAAASUVORK5CYII='}
                    minWidth="600px" borderRadius={10}
                    onClick={ handleClickSelectFile }

                ></Image>


                <Flex position={"absolute"} zIndex={900} bottom={-120} pr={150} justifyContent={"center"}>
                    <VStack
                        divider={<StackDivider/>}
                        spacing={3}
                        align='stretch'

                    >

                        <Flex justifyItems={"center-space"} alignItems={"center"}>
                            <Avatar size='xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo'/>{' '}
                            <Heading size='lg'>Lee Khanhh Linh</Heading>
                        </Flex>


                        <Box width={"500px"}>
                            <Flex minWidth='max-content' alignItems='center' gap='2'>
                                <Box p='2'>
                                    <Heading size='md'>Chakra App</Heading>
                                </Box>
                                <Spacer/>


                                <ButtonGroup gap='1'>
                                    <Button leftIcon={<EditIcon/>} colorScheme='twitter'>Edit Profile</Button>

                                </ButtonGroup>
                            </Flex>


                        </Box>
                    </VStack>


                </Flex>


            </Flex>
        </Box>


    )

};
export default CoverPicture