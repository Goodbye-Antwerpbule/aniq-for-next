import { Box, Container, Flex, Heading } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box
      bgColor="gray.100"
      p={{ base: 1, md: 1 }}
      position="fixed"
      width="100%"
      bottom="0%"
    >
      <Container>
        <Flex
          as="header"
          py="3"
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
