import { Box, Heading, Center } from "@chakra-ui/react";

const Card = ({ children, title }: any) => {
  return (
    <Box width={"100%"}>
      <Heading size="sm" my={"10px"}>
        {title}
      </Heading>
      <Center
        bg="white"
        shadow={"sm"}
        padding={5}
        border={"1px"}
        borderColor={"gray.100"}
        rounded={"md"}
      >
        {children}
      </Center>
    </Box>
  );
};

export default Card;
