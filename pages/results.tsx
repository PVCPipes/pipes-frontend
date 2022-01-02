import type { NextPage } from "next";
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
  Center,
} from "@chakra-ui/react";
import DetailsDrawer from "../components/DetailsDrawer";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingComponent";

const Results: NextPage = () => {
  const tryCode = [
    {
      studentName: "Blaise",
      studentID: "32142531",
      courseCode: "C2001",
      canGraduate: false,
      creditPointsAccumulated: 20,
    },
    {
      studentName: "Abu",
      studentID: "213213",
      courseCode: "C2001",
      canGraduate: false,
      creditPointsAccumulated: 20,
    },
    {
      studentName: "Ahmad",
      studentID: "123123234132",
      courseCode: "C2002",
      canGraduate: true,
      creditPointsAccumulated: 20,
    },
  ];
  const { onToggle, isOpen } = useDisclosure();
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // const { View: LottieView } = useLottie({
  //   animationData: loadingAnimation,
  //   loop: true,
  //   autoplay: true,
  // });

  const onRowClick = (index: number) => {
    setSelectedDataIndex(index);
    onToggle();
  };

  return (
    <>
      <LoadingPage />
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
              <Skeleton h="20px" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

const ResultsDetails = ({ selectedData }: { selectedData: any }) => {
  const failed = [
    {
      code: "FIT1008",
      creditPoints: 6,
      tag: 1,
    },
    {
      code: "MAT1830",
      creditPoints: 6,
      tag: 1,
    },
    {
      code: "MAT1841",
      creditPoints: 6,
      tag: 1,
    },
    {
      code: "FIT1047",
      creditPoints: 6,
      tag: 1,
    },
    {
      code: "FIT2004",
      creditPoints: 6,
      tag: 2,
    },

    {
      code: "MPU3113",
      creditPoints: 0,
      tag: 3,
    },
    {
      code: "MPU3123",
      creditPoints: 0,
      tag: 3,
    },
    {
      code: "MPU3212",
      creditPoints: 0,
      tag: 3,
    },
  ];

  const aditionalRules = [
    {
      name: "Level 3 Credit Points Summation",
      category: "creditPoints",
      tag: 3,
      targetValue: 36,
      evalOperator: "eq",
      operation: "sum",
      achievedValue: 6,
      passedRule: false,
    },
    {
      name: "Level 1 Credit Points Summation",
      category: "creditPoints",
      tag: 1,
      targetValue: 60,
      evalOperator: "lte",
      operation: "sum",
      achievedValue: 6,
      passedRule: true,
    },
  ];
  const colors = ["cyan", "red", "pink", "blue", "teal", "green"];

  return (
    <VStack h="100%" align={"stretch"} spacing="20px">
      <Card title={"Missing units"}>
        {failed.length ? (
          <Wrap spacing={3}>
            {failed?.map(({ code, tag }) => (
              <Badge
                colorScheme={colors[tag - 1]}
                rounded={"md"}
                fontSize="md"
                py="1"
                px="2"
              >
                {code}
              </Badge>
            ))}
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
            value={40}
            color="teal.400"
            thickness="7px"
            size="125px"
            capIsRound
          >
            <CircularProgressLabel>{`${40}%`}</CircularProgressLabel>
          </CircularProgress>
          <Text p={2} w="55%">
            Student had achieved 40% of the total credit points of 144
          </Text>
        </HStack>
      </Card>
      <Card title={"Additional Requirements"}>
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
          {aditionalRules.map(
            ({ name, category, achievedValue, targetValue }) => {
              const percentage = Math.round(
                (achievedValue * 100) / targetValue
              );
              return (
                <StatsComponent
                  description={`The student acheived ${achievedValue} over ${targetValue} ${category}`}
                  percentage={percentage}
                  header={name}
                  category={category}
                />
              );
            }
          )}
        </VStack>
      </Card>
    </VStack>
  );
};

const Card = ({ children, title }: any) => {
  return (
    <Box>
      <Heading size="sm" my={"10px"}>
        {title}
      </Heading>
      <Center
        shadow={"sm"}
        padding={5}
        border={"1px"}
        borderColor={"gray.100"}
        rounded={"md"}
      >
        {children}
      </Center>
    </Box>
  );
};

const StatsComponent = ({
  percentage,
  description,
  category,
  header,
}: {
  percentage: number;
  description: string;
  category?: string;
  header: string;
}) => {
  return (
    <HStack justify="space-between">
      <CircularProgress
        w="40%"
        trackColor="transparent"
        value={percentage}
        color="teal.400"
        thickness="7px"
        size="125px"
        capIsRound
      >
        <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
      </CircularProgress>
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

export default Results;
