import type { NextPage } from "next";
import { useState, useRef } from "react";
import { Heading, Link, Box } from "@chakra-ui/react";
import Header from "../components/header/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Box p={2}>
        <Header />
        <Heading as="h1" size="2xl" mb="2">
          This is Home Page
        </Heading>
      </Box>
    </div>
  );
};

export default Home;
