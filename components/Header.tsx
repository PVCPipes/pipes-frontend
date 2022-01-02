import { HStack, Text, Button, Image } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function () {
  const { logout } = useAuth();

  return (
    <HStack
      p="3"
      w="100vw"
      border="1px"
      borderColor={"gray.200"}
      justify="space-between"
    >
      <Logo />
      <HStack spacing={4} direction="row" align="center">
        <Button onClick={logout} colorScheme={"red"} width={"100%"}>
          Logout
        </Button>
      </HStack>
    </HStack>
  );
}
