import {
  Box,
  Button,
  Collapse,
  Fade,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AnimeData } from "../interface/types";

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
  const toast = useToast();
  const answerList =
    animeList.length > 0
      ? animeList.filter(
          (_anime, index) => index >= gameCnt * 8 && index < (gameCnt + 1) * 8
        )
      : [];
  const shuffleAnimeList = shuffleArray(answerList);

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

function shuffleArray<T>(array: T[]): T[] {
  return array.slice().sort(() => Math.random() - Math.random());
}

export default AnswerButtonGroup;
