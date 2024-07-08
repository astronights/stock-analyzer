import {
    Flex, Button, useColorModeValue, Stack, useColorMode, HStack, Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
const TbIcons = require("react-icons/tb");

interface NavProps {
    color: string;
    updatePage?: any;
}

const NavBar = (props: NavProps) => {
    const colors = {
        "blue": "#3182CE",
        "cyan": "#00B5D8",
        "gray": "#718096",
        "green": "#38A169",
        "orange": "#DD6B20",
        "pink": "#D53F8C",
        "purple": "#805AD5",
        "red": "#E53E3E",
        "teal": "#319795",
        "yellow": "#D69E2E"
    };

    const { colorMode, toggleColorMode } = useColorMode();

    const scrollToHeader = () => {
        const heroSection = document.querySelector("#header");
        heroSection.scrollIntoView({ behavior: "smooth" });
    };

    const TbLetterComponents = 'STOCK ANALYZER'.split('').map((letter) =>
        letter === ' ' ? TbIcons['TbSeparator'] : TbIcons[`TbLetter${letter}`]);

    return (
        <>
            <Flex
                bg={useColorModeValue("gray.100", "gray.900")}
                px={4}
                h={16}
                boxShadow={scroll ? "base" : "none"}
                zIndex="sticky"
                position="fixed"
                as="header"
                alignItems={"center"}
                justifyContent={"space-between"}
                w="100%"
            >
                <Link onClick={scrollToHeader}>
                    <HStack gap={'0.3rm'}>
                        {TbLetterComponents.map((Component, index) => {
                            if (Component.name === "TbSeparator") {
                                return <Component key={index} color={'transparent'} />;
                            } else {
                                return <Component key={index} color={colors[props.color]} />
                            }
                        }
                        )}
                    </HStack>
                </Link>

                <Flex alignItems={"center"}>
                    <Stack direction={"row"} spacing={3}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </>
    );
}

export default NavBar;