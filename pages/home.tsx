import type { NextPage } from "next";
import { useState, useRef } from "react";
import { Heading, Link, Box, Input } from "@chakra-ui/react";
// import Header from "../components/header/Header";

const Home: NextPage = () => {
  return (
    <Box p={2}>
      <Input type="file" />
    </Box>
  );
};

export default Home;
