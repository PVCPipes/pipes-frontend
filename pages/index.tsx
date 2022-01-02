import type { NextPage } from "next";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Index: NextPage = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <Heading as="h1" size="2xl" mb="2">
        This is Home Page User: {user ? "login" : "logout"}
      </Heading>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Index;
