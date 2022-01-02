import type { NextPage } from "next";
const colors = ["cyan", "red", "pink", "blue", "teal", "green"];
import {
  Text,
  Tr,
  Td,
  Box,
  useDisclosure,
  Skeleton,
  Badge,
  Table,
  Tbody,
  Th,
  Thead,
  HStack,
  Wrap,
  Heading,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  StackDivider,
  Button,
  Center,
} from "@chakra-ui/react";
import { CheckCircleIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";

import { useResults } from "../context/ResultsContext";
import { useRouter } from "next/router";

import Card from "../components/Card";
import Logo from "../components/Logo";
import withAuth from "../context/ProtectedRoutesWrapper";
import DetailsDrawer from "../components/DetailsDrawer";
import { getPayload } from "../lib/db";

const Results: NextPage = () => {
  const { resultLists, setResults } = useContext(useResults);
  const { onToggle, isOpen } = useDisclosure();
  const router = useRouter();
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tryCode, setCode] = useState(
    resultLists.map((obj: any) => ({
      creditPointsAccumulated: `${obj.creditsTakenByStudents} / ${obj.requiredCreditPoints}`,
      canGraduate: obj?.canGraduate,
      studentID: obj?.studentID,
      courseCode: obj?.course,
      studentName: obj?.name,
      ...obj,
    }))
  );

  useEffect(() => {
    const { code } = router.query;
    callFirebase(code as any);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [router.query]);

  const callFirebase = async (code: string) => {
    if (code) {
      const results = await getPayload(code);
      setResults(
        Object.keys(results as any).map((key: string) => (results as any)[key])
      );
      setCode(
        Object.keys(results as any)
          .map((key: string) => (results as any)[key])
          .map((obj: any) => ({
            creditPointsAccumulated: `${obj.creditsTakenByStudents} / ${obj.requiredCreditPoints}`,
            canGraduate: obj?.canGraduate,
            studentID: obj?.studentID,
            courseCode: obj?.course,
            studentName: obj?.name,
            ...obj,
          }))
      );
    }
  };

  const onRowClick = (index: number) => {
    setSelectedDataIndex(index);
    onToggle();
  };

  return (
    <>
      <HStack justify="space-between" p="20px" pb="0px">
        <Logo />
        <Button leftIcon={<SearchIcon />} width={"30%"} textAlign={"start"}>
          <Text textAlign={"start"} width="100%">
            Search
          </Text>
        </Button>
      </HStack>
      <Box padding={"20px"}>
        <Card>
          <Table colorScheme="teal" size="md">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>Student ID</Th>
                <Th>Course Code</Th>
                <Th>Credit Points Accumulated</Th>
                <Th>Graduability</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <TableLoading columnsToLoad={5} rowsToLoad={10} />
              ) : (
                <>
                  {tryCode?.map(
                    (
                      {
                        studentName,
                        studentID,
                        courseCode,
                        canGraduate,
                        creditPointsAccumulated,
                      },
                      index
                    ) => (
                      <Tr
                        userSelect={"none"}
                        onClick={() => onRowClick(index)}
                        key={studentID}
                        _hover={{
                          cursor: "pointer",
                          bg: "teal.200",
                          rounded: "md",
                        }}
                      >
                        <Td>{studentName}</Td>
                        <Td>{studentID}</Td>
                        <Td>{courseCode}</Td>
                        <Td>{creditPointsAccumulated}</Td>
                        <Td>
                          <Badge colorScheme={canGraduate ? "green" : "red"}>
                            {JSON.stringify(canGraduate)}
                          </Badge>
                        </Td>
                      </Tr>
                    )
                  )}
                </>
              )}
            </Tbody>
          </Table>
        </Card>
      </Box>

      <DetailsDrawer onToggle={onToggle} isOpen={isOpen} title="Details">
        <ResultsDetails selectedData={tryCode[selectedDataIndex]} />
      </DetailsDrawer>
    </>
  );
};

const TableLoading = ({ columnsToLoad = 1, rowsToLoad = 1 }: any) => {
  const columns = new Array(columnsToLoad).fill(1);
  const rows = new Array(rowsToLoad).fill(1);
  return (
    <>
      {rows.map((_, index) => (
        <Tr key={index}>
          {columns.map((_, index) => (
            <Td key={index}>
              <Skeleton h="25px" rounded="lg" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

const ResultsDetails = ({ selectedData }: { selectedData: any }) => {
  const failed = selectedData.coreRulesResults.fails as any;
  const additionalRules = selectedData?.additionalRulesResults as any;
  const { creditsTakenByStudents, requiredCreditPoints, takenUnits } =
    selectedData;
  const creditPercentage = Math.floor(
    (creditsTakenByStudents * 100) / requiredCreditPoints
  );

  const groupCode = () => {
    const obj = {};
    takenUnits.forEach((code: string) => {
      const match = code.match(/\d+/);
      const first = parseInt((match?.toString() as any)[0], 10);
      if (!(obj as any)[first]) (obj as any)[first] = [];
      (obj as any)[first].push(code);
    });
    return Object.keys(obj).map((key) => ({
      units: (obj as any)[key],
      tag: key,
    }));
  };

  return (
    <VStack h="100%" align={"stretch"} spacing="20px">
      <Card title={"Missing units"}>
        {failed.length ? (
          <Wrap spacing={3}>
            {failed.map(({ code, tag, operation, fails }: any) =>
              operation ? (
                <Badge
                  key={JSON.stringify({ code, tag, operation, fails })}
                  colorScheme={colors[tag - 1]}
                  rounded={"md"}
                  fontSize="md"
                  p="4"
                >
                  {"Need at least one"}
                  <Wrap spacing={1}>
                    {fails.map(({ code, tag }: any) => (
                      <CodeBadge code={code} tag={tag} />
                    ))}
                  </Wrap>
                </Badge>
              ) : (
                <CodeBadge code={code} tag={tag} />
              )
            )}
          </Wrap>
        ) : (
          <HStack>
            <CheckCircleIcon boxSize={"40px"} color={"green.300"} mr={"10px"} />
            <Heading as="h2" size="md" mt={6} mb={2}>
              All units taken
            </Heading>
          </HStack>
        )}
      </Card>
      <Card title={"Credit points progress"}>
        <HStack>
          <CircularProgress
            w="40%"
            trackColor="transparent"
            value={creditPercentage}
            color="teal.400"
            thickness="7px"
            size="135px"
            capIsRound
          >
            <CircularProgressLabel>{`${creditPercentage}%`}</CircularProgressLabel>
          </CircularProgress>
          <Text p={2} w="55%">
            {`Student had achieved ${creditPercentage}% of the total credit points of ${requiredCreditPoints}`}
          </Text>
        </HStack>
      </Card>
      <Card title={"Additional Requirements"}>
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
          {additionalRules?.map(
            ({
              name,
              category,
              achievedValue,
              targetValue,
              evalOperator,
              passedRule,
            }: any) => {
              const percentage = Math.round(
                (achievedValue * 100) / targetValue
              );
              const description = () => {
                switch (evalOperator) {
                  case "sum":
                    return `The student acheived ${achievedValue} over ${targetValue} ${category}`;
                  case "lte":
                    return `The student ${
                      passedRule ? "has" : "did not"
                    } acheived less than ${targetValue} ${category}, currently at ${achievedValue} ${category}`;
                  case "mte":
                    return `The student ${
                      passedRule ? "has" : "did not"
                    } acheived more than ${targetValue} ${category}, currently at ${achievedValue} ${category}`;
                  default:
                    return "";
                }
              };

              return (
                <StatsComponent
                  description={description()}
                  evalOperator={evalOperator}
                  passedRule={passedRule}
                  percentage={percentage}
                  category={category}
                  header={name}
                  key={name}
                />
              );
            }
          )}
        </VStack>
      </Card>
      <Card title={"Units taken by students"}>
        <Wrap spacing={3}>
          {groupCode().map(({ tag, units }: any, index: number) => {
            return (
              <Badge key={tag} padding={3}>
                <Text>{`Level ${tag} units`}</Text>
                <Wrap>
                  {units.map((code: string, index: number) => {
                    return (
                      <CodeBadge
                        tag={tag}
                        code={code}
                        key={`${index}${code}`}
                      />
                    );
                  })}
                </Wrap>
              </Badge>
            );
          })}
        </Wrap>
      </Card>
    </VStack>
  );
};

const CodeBadge = ({ code, tag }: any) => {
  return (
    <Badge
      key={code}
      colorScheme={colors[tag - 1]}
      rounded={"md"}
      fontSize="md"
      py="1"
      px="2"
    >
      {code}
    </Badge>
  );
};

const StatsComponent = ({
  evalOperator,
  percentage,
  passedRule,
  description,
  category,
  header,
}: {
  passedRule: boolean;
  evalOperator: string;
  percentage: number;
  description: string;
  category?: string;
  header: string;
}) => {
  const statsComponentResolver = () => {
    switch (evalOperator) {
      case "lte":
        return (
          <Center w="40%" height={"100%"}>
            {passedRule ? (
              <CheckCircleIcon width={10} height={10} color={"green.500"} />
            ) : (
              <CloseIcon width={8} height={8} color={"red.500"} />
            )}
          </Center>
        );
      case "mte":
        return (
          <Center w="40%" height={"100%"}>
            {passedRule ? (
              <CheckCircleIcon width={10} height={10} color={"green.500"} />
            ) : (
              <CloseIcon width={8} height={8} color={"red.500"} />
            )}
          </Center>
        );
      case "eq":
        return (
          <CircularProgress
            w="40%"
            trackColor="transparent"
            value={percentage}
            color="teal.400"
            thickness="7px"
            size="135px"
            capIsRound
          >
            <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
          </CircularProgress>
        );
    }
  };

  return (
    <HStack justify="space-between">
      {statsComponentResolver()}
      <VStack align={"start"} w="55%">
        {category && (
          <Badge colorScheme="blue" fontSize={"xs"} rounded={"md"}>
            {category}
          </Badge>
        )}
        <Text fontWeight="bold">{header}</Text>
        <Text fontSize={"14px"} color={"gray.600"}>
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

export default withAuth(Results);
