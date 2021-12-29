import type { NextPage } from 'next';
import { Heading, Link, Box, Text } from "@chakra-ui/react"



const Header: NextPage = (props) => {
    return (
        <Box
          {...props}
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          bg="yellow"
        >
          <Text fontSize="lg" fontWeight="bold">This is Header</Text>
        </Box>
      )
}

export default Header;