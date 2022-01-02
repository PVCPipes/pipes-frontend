import type { NextPage } from "next";
import { useState, useRef } from "react";
import { Heading, Link } from "@chakra-ui/react";
import Header from "../components/header/Header";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <Header />
      <Heading as="h1" size="2xl" mb="2">
        This is Home Page
        <h2>User: {user ? "login" : "logout"}</h2>
      </Heading>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
