import { Box } from "@chakra-ui/react";
import React, { createContext, ReactElement, useState } from "react";

export const useResults = createContext({
  setResults: (lists: any) => {},
  resultLists: [],
});

const ResultsProvider = ({ children }: { children: ReactElement }) => {
  const [results, setResults] = useState([]);

  return (
    <useResults.Provider value={{ resultLists: results, setResults }}>
      <Box>{children}</Box>
    </useResults.Provider>
  );
};

export default ResultsProvider;
