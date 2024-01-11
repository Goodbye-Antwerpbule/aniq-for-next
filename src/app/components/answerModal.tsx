import {
  Box,
  Button,
  Center,
  Fade,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimeData } from "../interface/types";
import { ShuffleArray } from "../interface/shuffleArrayClass";

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
  const { isOpen, onClose, onToggle } = useDisclosure();

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
        <Box>
          <Center>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>選択肢</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box
                    p="10px"
                    color="white"
                    mt="3"
                    bg="transparent"
                    rounded="md"
                  >
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
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
          <Center>
            <Box
              style={{
                paddingBottom: "100px",
                paddingTop: "100px",
                display: "inline-block",
                position: "relative",
                bottom: "9%",
              }}
            >
              <Button onClick={onToggle} size="lg" colorScheme="green">
                回答する
              </Button>
            </Box>
          </Center>
        </Box>
      )}
    </>
  );
}

export default AnswerModal;
