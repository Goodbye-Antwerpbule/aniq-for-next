import Link from "next/link";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import titleImage from "./images/title.png";
export default function Home() {
  return (
    <>
      <Flex py={10}>
        <Box w="20%" />
        <Spacer />
        <Box background="teal.200">
          <Image
            src={titleImage}
            width={800}
            height={300}
            alt="Picture of the author"
          />
        </Box>

        <Spacer />
        <Box w="20%" />
      </Flex>
      <Flex>
        <Box w="30%" />
        <Spacer />
        <Box pb="10">
          <Link href="/quiz">
            <Heading
              fontSize="2xl"
              cursor="pointer"
              _hover={{
                color: "teal.500",
              }}
            >
              クイズを始める
            </Heading>
          </Link>
        </Box>
        <Spacer />
        <Box w="30%" />
      </Flex>
    </>
  );
}
