import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import { Heading, Link } from "@chakra-ui/react";
import Header from "../components/header/Header"

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Heading as="h1" size="2xl" mb="2">
        This is Home Page
      </Heading>
    </div>
  )
}

export default Home;
