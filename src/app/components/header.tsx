/* src/components/Header.tsx */
import { Box, Flex, Container, Heading } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <Box bgColor="gray.100">
      <Container maxW={"container.lg"}>
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="left"
        >
          <Link href="/" passHref>
            <Heading as="h1" fontSize="2xl" cursor="pointer">
              AniQ -Anime Image Quiz-
            </Heading>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
