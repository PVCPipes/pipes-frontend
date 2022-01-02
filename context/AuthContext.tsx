import { createContext, ReactNode, useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase.config";

type authContextType = {
  user: boolean | null;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(null);

  const provider = new GoogleAuthProvider();
  const DOMAIN_NAMES = ["@student.monash.edu", "@monash.edu"];

  const checksEmailMatchesDomains = (
    arrayOfAcceptableDomainNames: string[],
    userEmail: string | null
  ): boolean =>
    arrayOfAcceptableDomainNames
      .map((domain_name) => userEmail.toLowerCase().endsWith(domain_name))
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (checksEmailMatchesDomains(DOMAIN_NAMES, result.user.email)) {
          setUser(true);
          console.log(result.user.email);
          // The signed-in user info.
          const user = result.user;
          console.log({ credential, token, user });
        } else {
          logout();
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const logout = () => {
    setUser(false);
    auth.signOut();
    console.log("logout");
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
