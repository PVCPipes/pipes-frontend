import { Box, HStack, Image, Text } from "@chakra-ui/react";

export default function () {
  return (
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
  );
}
