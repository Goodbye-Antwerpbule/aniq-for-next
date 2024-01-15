import {
  Box,
  Button,
  Center,
  Fade,
  Grid,
  Slide,
  useDisclosure,
  Select,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { AnimeData } from "../interface/types";
import { SetStateAction, useRef, useState } from "react";

type AnswerButtonGroupProps = {
  animeList: AnimeData[];
  onSubmit: (title: string) => void;
  isLoading: boolean;
  isDesktop: boolean;
};

function AnswerModal({
  animeList,
  onSubmit,
  isLoading,
  isDesktop,
}: AnswerButtonGroupProps) {
  const { isOpen, onToggle } = useDisclosure();

  const onAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) onSubmit(e.currentTarget.textContent);
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSubmit(e.target.value);
  };

  return (
    <>
      {isDesktop ? (
        <Box>
          <Fade
            in={isOpen}
            style={{
              display: "inline-flex",
              position: "fixed",
              bottom: "20%",
              right: "1%",
              zIndex: 10,
            }}
            unmountOnExit={true}
          >
            <Box p="40px" color="white" mt="4" bg="transparent" rounded="md">
              <Grid gap={2}>
                {!isLoading
                  ? animeList.map((anime) => (
                      <Box key={anime.title}>
                        <Button onClick={onAnswer}>{anime.title}</Button>
                      </Box>
                    ))
                  : ""}
              </Grid>
            </Box>
          </Fade>
          <Box
            style={{
              display: "inline-block",
              position: "fixed",
              top: "80%",
              left: "80%",
              zIndex: 10,
            }}
          >
            <Button onClick={onToggle} size="lg" colorScheme="green">
              回答する
            </Button>
          </Box>
        </Box>
      ) : (
        <Box pt={5} pb={400}>
          <Flex>
            <Box width="5%" />
            <Spacer />
            <Select placeholder="回答する" onChange={onSelect}>
              {!isLoading
                ? animeList.map((anime) => (
                    <option key={anime.title} value={anime.title}>
                      {anime.title}
                    </option>
                  ))
                : ""}
            </Select>
            <Spacer />
            <Box width="5%" />
          </Flex>
        </Box>
      )}
    </>
  );
}

export default AnswerModal;
