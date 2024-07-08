import {
    Container, Stack, Box, Text, Highlight,
    Card, CardHeader, Heading, HStack, CardBody,
    StackDivider, Code, Badge, Link,
} from "@chakra-ui/react"


const Home = (props: { color: string }) => {


    return (
        <>
            <Container maxW={"4xl"} id="header">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 6, md: 6 }}
                    pb={{ base: 20, md: 16 }}
                    pt={{ base: 24, md: 24 }}
                >
                    <Card>
                        <CardHeader>
                            <Heading size='md'>Logs</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading textAlign={'left'} size='xs' textTransform='uppercase'>
                                        Session Logs
                                    </Heading>
                                    <Text textAlign={'left'} pt='2' fontSize='sm'>
                                        The game is simple. You are presented with a cryptic crossword clue and you have to guess the answer.
                                        The answer can be a single word or a phrase. The clue will be presented in a standard cryptic crossword format.
                                        You have 5 attempts to guess the right answer, after each of which your answer is validated.
                                        The game will end after 5 attempts or if you guess the right answer.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>

                </Stack>
            </Container>
        </>
    )
}

export default Home;