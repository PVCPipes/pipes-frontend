import {
  Box,
  HStack,
  Center,
  VStack,
  CircularProgress,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const LoadingPage = () => {
  const imagesLink = [
    {
      imageLink: "https://c.tenor.com/0GQPmRismkoAAAAC/arsthetic-loading.gif",
      bgColor: "white",
    },
    {
      imageLink: "https://c.tenor.com/5bH3P9fg7poAAAAd/cute-cat.gif",
      bgColor: "white",
    },
    {
      imageLink:
        "https://media3.giphy.com/media/26BGzqYPbzYuJp3tC/giphy.gif?cid=790b76112907caa8ad8edb2520fdedd2b314c08ebf4e4ba2&rid=giphy.gif&ct=g",
      bgColor: "white",
    },
  ];
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => setSelected((s) => (s + 1) % 3), 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <Box
      position={"fixed"}
      width={"100vw"}
      height={"100vh"}
      top={0}
      left={0}
      bg={imagesLink[selected].bgColor}
      zIndex={2}
    >
      <HStack height="100%" p={20} justify="space-between" w="100%">
        <Image
          src={imagesLink[selected].imageLink}
          rounded={"xl"}
          shadow={"lg"}
          w="45%"
          h="100%"
        />
        <Center w="45%">
          <VStack>
            <HStack>
              <CircularProgress
                isIndeterminate
                color="teal"
                mr={7}
                size="90px"
              />
              <VStack align={"start"}>
                <Text fontSize="4xl" margin={0}>
                  Loading
                </Text>
                <Text textColor={"gray.500"}>We are processing your input</Text>
              </VStack>
            </HStack>
          </VStack>
        </Center>
      </HStack>
    </Box>
  );
};

export default LoadingPage;
