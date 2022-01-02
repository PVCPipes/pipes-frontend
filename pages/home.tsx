import type { NextPage } from "next";
import { useState } from "react";
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
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import Card from "../components/Card";
import { useRouter } from "next/router";
import xlsx from "xlsx";

const Home: NextPage = () => {
  const [file, setFiles] = useState([]);
  const router = useRouter();

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
    }
  };

  return (
    <Box
      p={2}
      width={"100vw"}
      height={"100vh"}
      backgroundSize={"120% 100%"}
      backgroundRepeat={"no-repeat"}
      bgImage={
        "https://assets.website-files.com/5d5e2ff58f10c53dcffd8683/5d9d126de6b3b43d496aea9d_laying.svg"
      }
    >
      <Heading width="100%" padding={8}>
        Waiting for you to start working ....
      </Heading>
      <Drawer isOpen={true} onClose={() => {}} placement="left" size={"sm"}>
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
              </VStack>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Home;
