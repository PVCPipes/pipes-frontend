import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/nunito/600.css";
import "../lib/firebase.config";
import { AuthProvider } from "../context/AuthContext";

const theme = extendTheme({
  fonts: {
    heading: "nunito",
    body: "nunito",
  },
  components: {
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
