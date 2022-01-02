import { createContext, ReactNode, useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

type authContextType = {
  user: boolean | null;
  login: () => void;
  logout: () => void;
  emailInvalid: boolean;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
  emailInvalid: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<any>();
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const provider = new GoogleAuthProvider();
  const DOMAIN_NAMES = ["@student.monash.edu", "@monash.edu"];
  const router = useRouter();
  const toast = useToast();

  const checksEmailMatchesDomains = (
    arrayOfAcceptableDomainNames: string[],
    userEmail: string | null
  ): boolean =>
    arrayOfAcceptableDomainNames
      .map((domain_name) =>
        (userEmail as any).toLowerCase().endsWith(domain_name)
      )
      .includes(true);

  const evaluatesUserMail = (
    userEmail: string,
    arrayOfAcceptableDomainNames: string[],
    onAccepted: Function,
    onRejected: Function
  ): void =>
    checksEmailMatchesDomains(arrayOfAcceptableDomainNames, userEmail)
      ? onAccepted()
      : onRejected();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (checksEmailMatchesDomains(DOMAIN_NAMES, result.user.email)) {
          setUser(true);
          console.log(result.user.email);
          const user = result.user;
          toast({
            title: "Login Successful",
            description: "You can play with the pipes now",
            status: "success",
            isClosable: true,
          });
          localStorage.setItem("pipesAccessToken", JSON.stringify(token));
          router.push("/home");
        } else {
          setEmailInvalid(true);
          console.log("Please use a Monash authenticated domain");
          toast({
            title: "Login Unsuccessful...",
            description:
              "Please use a Monash authenticated domain email (ex: @student.monash.edu / @monash.edu ...)",
            status: "error",
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const logout = () => {
    setUser(false);
    auth.signOut();
    localStorage.removeItem("pipesAccessToken");
    toast({
      title: "Logout Successful",
      description: "You can not play with the pipes now",
      status: "success",
      isClosable: true,
    });

    router.push("/login");
  };

  const value = {
    user,
    login,
    logout,
    emailInvalid,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
