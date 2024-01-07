import { Box, Button, Fade, Grid, useDisclosure } from "@chakra-ui/react";
import { AnimeData } from "../interface/types";
import { ShuffleArray } from "../interface/shuffleArrayClass";

type AnswerButtonGroupProps = {
  animeList: AnimeData[];
  gameCnt: number;
  onSubmit: (title: string) => void;
  isLoading: boolean;
  isDesktop: boolean;
};

function AnswerButtonGroup({
  animeList,
  gameCnt,
  onSubmit,
  isLoading,
  isDesktop,
}: AnswerButtonGroupProps) {
  const { isOpen, onToggle } = useDisclosure();

  const shuffleArray = new ShuffleArray();
  const shuffleAnimeList = shuffleArray.GetRandomSelection(
    animeList,
    gameCnt,
    8
  );

  const onAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) onSubmit(e.currentTarget.textContent);
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
            }}
            unmountOnExit={true}
          >
            <Box p="40px" color="white" mt="4" bg="transparent" rounded="md">
              <Grid gap={2}>
                {!isLoading
                  ? shuffleAnimeList.map((anime) => (
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
            }}
          >
            <Button onClick={onToggle} size="lg" colorScheme="green">
              回答する
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Fade
            in={isOpen}
            style={{
              display: "inline-flex",
              position: "fixed",
              bottom: "14%",
              left: "0%",
            }}
            unmountOnExit={true}
          >
            <Box p="40px" color="white" mt="4" bg="transparent" rounded="md">
              <Grid gap={2}>
                {!isLoading
                  ? shuffleAnimeList.map((anime) => (
                      <Box key={anime.title}>
                        <Button size="sm" onClick={onAnswer}>
                          {anime.title}
                        </Button>
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
              top: "85%",
              left: "65%",
            }}
          >
            <Button onClick={onToggle} size="lg" colorScheme="green">
              回答する
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default AnswerButtonGroup;
