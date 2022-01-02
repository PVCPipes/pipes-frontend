import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import withAuth from "../context/ProtectedRoutesWrapper";

const Index: NextPage = () => {
  return <Box></Box>;
};

export default withAuth(Index);
