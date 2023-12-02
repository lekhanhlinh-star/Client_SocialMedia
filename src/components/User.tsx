import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Avatar, Flex } from '@chakra-ui/react'


export default function User() {



    return (
        <>
            <Card

            >


                <Flex direction={"row"}>
                    <CardBody>

                        <Avatar

                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'

                        />

                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                    </CardBody>

                </Flex>
            </Card>

        </>
    )
}