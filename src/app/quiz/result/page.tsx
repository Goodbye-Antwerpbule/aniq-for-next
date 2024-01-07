"use client";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  const getArrayFromLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };
  // const searchParams = useSearchParams();
  // const paramTitle = searchParams.getAll("paramTitle");
  // const paramYear = searchParams.getAll("paramYear") as unknown as number[];
  // const paramSeason = searchParams.getAll("paramSeason");
  // const paramCorrect = searchParams.getAll(
  //   `paramCorrect`
  // ) as unknown as boolean[];
  const paramTitle =
    typeof window !== "undefined"
      ? (getArrayFromLocalStorage("paramTitle") as string[])
      : [];
  const paramYear =
    typeof window !== "undefined"
      ? (getArrayFromLocalStorage("paramYear") as number[])
      : [];
  const paramSeason =
    typeof window !== "undefined"
      ? (getArrayFromLocalStorage("paramSeason") as string[])
      : [];
  const paramCorrect =
    typeof window !== "undefined"
      ? (getArrayFromLocalStorage("paramCorrect") as unknown as boolean[])
      : [];

  return (
    <>
      <Center pt="4">
        <Heading>
          {paramTitle.length == 1
            ? "0問正解"
            : `${paramTitle.length - 1}問正解！`}
        </Heading>
      </Center>
      <Flex py={10}>
        <Box w="20%" />
        <Spacer />
        <Box background="teal.200">
          <Grid>
            {paramTitle.map((value, index) => (
              <Box key={index}>
                <Heading size="sm">
                  {index + 1}問： {paramCorrect[index] ? "◯" : "✕"}
                </Heading>
                <Text>
                  {paramYear[index]}年{paramSeason[index]}： {value}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        <Spacer />
        <Box w="20%" />
      </Flex>
    </>
  );
}
