import type { NextPage } from "next";
import {
  Heading,
  Link,
  Box,
  Text,
  Center,
  ChakraProvider,
} from "@chakra-ui/react";

export type LoginInfo = {
  email: string;
  password: string;
};

const Login: NextPage = (props) => {
  return (
    <div>
      <ChakraProvider>
        <Box
          {...props}
          width={["100vw", "500px"]}
          height={["100vh", "700px"]}
          overflowY={"auto"}
          bg="yellow"
          m={"auto"}
          p={"0.5rem"}
          position={"relative"}
        >
          <Text fontSize="lg" fontWeight="bold">
            This is Login Page
          </Text>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Login;
