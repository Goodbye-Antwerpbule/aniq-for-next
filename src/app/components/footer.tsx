import { Box, Container, Flex, Heading } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box bgColor="gray.100" p={{ base: 1, md: 1 }}>
      <Container maxW={"container.lg"}>
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="left"
        >
          <Heading as="h1" fontSize="2xl" cursor="pointer">
            AniQ -Anime Image Quiz-
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
}
