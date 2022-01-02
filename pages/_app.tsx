import type { AppProps } from "next/app";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import "../lib/firebase.config";
import { AuthProvider } from "../context/AuthContext";

// import { Fuego } from "../lib/firebase.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
