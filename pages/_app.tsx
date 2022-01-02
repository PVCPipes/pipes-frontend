import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/nunito/600.css";
import "../lib/firebase.config";
import { AuthProvider } from "../context/AuthContext";
import ResultsProvider from "../context/ResultsContext";

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
      <ResultsProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ResultsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
