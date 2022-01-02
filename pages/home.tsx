import type { NextPage } from "next";
import { useContext, useState } from "react";
import {
  Box,
  Input,
  Text,
  VStack,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Heading,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import Card from "../components/Card";
import LoadingPage from "../components/LoadingComponent";
import Header from "../components/Header";
import { TimeIcon } from "@chakra-ui/icons";

import xlsx from "xlsx";
import axios from "axios";
import withAuth from "../context/ProtectedRoutesWrapper";
import { useResults } from "../context/ResultsContext";
import { useRouter } from "next/router";
import { addPayload } from "../lib/db";
import Link from "next/link";

const Home: NextPage = () => {
  const [file, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setResults } = useContext(useResults);

  function readFileAsync(file: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  const onFileClick = () => document.getElementById("fileInput")?.click();
  const onFileChange = (e: any) => {
    if (e.target.files) {
      setFiles(
        Object.keys(e.target.files).map(
          (key) => (e.target.files as any)[key]
        ) as any
      );
    }
  };

  const onFileSubmit = async () => {
    setIsLoading(true);

    if (file) {
      let payload: any[] = [];
      for (let i = 0; i < file.length; i++) {
        const f = file[i];
        const data = await readFileAsync(f);
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        payload = payload.concat(json);
      }
      payload = payload.sort(
        (a: any, b: any) => a["Person ID"] - b["Person ID"]
      );

      const res = await axios({
        url: process.env.NEXT_PUBLIC_BE_URL + "/api/v1/process",
        method: "post",
        data: {
          data: JSON.stringify(payload),
        },
      });
      setResults(res.data);
      console.log(res.data);
      await addPayload(res.data);
      setIsLoading(false);
    }
    router.push("/results");
  };

  return (
    <>
      <Header />
      <Box
        bgImage={
          "https://assets.website-files.com/5d5e2ff58f10c53dcffd8683/5d9d126de6b3b43d496aea9d_laying.svg"
        }
        backgroundRepeat={"no-repeat"}
        backgroundSize={"120% 100%"}
        height={"100vh"}
        width={"100vw"}
        p={2}
      >
        {isLoading && <LoadingPage />}
        <Heading width="100%" padding={8}>
          Waiting for you to start working ....
        </Heading>

        <Drawer
          variant="permanent"
          isOpen={!isLoading}
          onClose={() => {}}
          placement="left"
          size={"sm"}
        >
          <DrawerContent bg={"transparent"} shadow={"none"}>
            <DrawerBody alignItems={"center"} display={"flex"}>
              <Card>
                <VStack
                  width={"100%"}
                  height={"100%"}
                  align={"center"}
                  bg="white"
                >
                  <Heading size={"md"} fontWeight="bold">
                    Upload Your Documents
                  </Heading>
                  <Text color="gray.500">in .xlsx</Text>
                  <Button onClick={onFileClick} width={"100%"}>
                    Pick Files
                  </Button>
                  <Input
                    onChange={onFileChange}
                    id="fileInput"
                    type={"file"}
                    accept=".xlsx"
                    multiple
                    hidden
                  />
                  <VStack
                    border="1px"
                    rounded={"md"}
                    borderColor={"gray.200"}
                    maxH={"200px"}
                    width={"100%"}
                    overflowY={"auto"}
                    padding={"5px"}
                  >
                    {file.length ? (
                      file.map((a, index) => (
                        <Box
                          key={index}
                          shadow={"sm"}
                          padding={"10px"}
                          width={"100%"}
                          rounded={"ms"}
                          border={"1px"}
                          borderColor={"gray.100"}
                        >
                          <HStack overflow={"hidden"}>
                            <AttachmentIcon />
                            <Text>{(a as any)?.name}</Text>
                          </HStack>
                        </Box>
                      ))
                    ) : (
                      <Box padding={"10px"}>
                        <HStack>
                          <AttachmentIcon />
                          <Text>Upload Your Files</Text>
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                  <Button
                    disabled={!file.length}
                    onClick={onFileSubmit}
                    colorScheme={"teal"}
                    width={"100%"}
                  >
                    Submit File
                  </Button>
                  <Divider />
                  <VStack maxH={"300px"} spacing={2}>
                    <Heading size={"md"} fontWeight="bold">
                      Upload Your Documents
                    </Heading>
                    {JSON.parse(localStorage.getItem("codeList") as any)?.map(
                      (code: any) => {
                        return (
                          <Link href={`/results?code=${code}`} key={code}>
                            <Tag
                              size={"lg"}
                              key={code}
                              variant="subtle"
                              colorScheme="cyan"
                              onClick={() =>
                                router.push("results", {
                                  query: {
                                    code,
                                  },
                                })
                              }
                            >
                              <TagLeftIcon boxSize="12px" as={TimeIcon} />
                              <TagLabel textAlign={"start"}>
                                {new Date(code).toISOString()}
                              </TagLabel>
                            </Tag>
                          </Link>
                        );
                      }
                    )}
                  </VStack>
                </VStack>
              </Card>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default withAuth(Home);
