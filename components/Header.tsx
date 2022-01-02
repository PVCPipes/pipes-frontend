import { HStack, Text, Button, Image } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

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
      <HStack spacing={2}>
        <Image
          padding={2}
          height={10}
          width={10}
          src={
            "https://cdn-icons.flaticon.com/png/512/2482/premium/2482480.png?token=exp=1641116573~hmac=a31e144f149362243a46834257126bd8"
          }
        />
        <Text fontSize="2xl" fontWeight={"black"} color="gray.500">
          Pipes
        </Text>
      </HStack>
      <HStack spacing={4} direction="row" align="center">
        <Button onClick={logout} colorScheme={"red"} width={"100%"}>
          Logout
        </Button>
      </HStack>
    </HStack>
  );
}
