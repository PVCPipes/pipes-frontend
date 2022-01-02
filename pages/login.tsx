import type { NextPage } from "next";
import {
  Heading,
  Center,
  Button,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import withAuth from "../context/ProtectedRoutesWrapper";
import { useEffect } from "react";

export type LoginInfo = {
  email: string;
  password: string;
};

const Login: NextPage = (props) => {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("pipesAccessToken");
    if (accessToken) router.push("/home");
  }, []);

  return (
    <HStack w="100vw" h="100vh" align="center" justify="space-between">
      <Image
        src="https://assets.website-files.com/5d5e2ff58f10c53dcffd8683/5d5e30c8aa3dfeb336a56762_reading.svg"
        w="50%"
      />
      <Center w="50%">
        <VStack>
          <Heading p={2}>Pipes Unified Login</Heading>
          <Button onClick={login} width={"100%"}>
            Login
          </Button>
        </VStack>
      </Center>
    </HStack>
  );
};

export default Login;
