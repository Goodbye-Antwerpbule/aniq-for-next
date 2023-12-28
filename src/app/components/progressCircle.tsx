import { Spinner, Stack, ModalOverlay, Modal, Box } from "@chakra-ui/react";

type ProgressProps = { isLoading: boolean };

function ProgressCircle({ isLoading }: ProgressProps) {
  return (
    <>
      {isLoading && (
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay>
            <Box top="50%" left="50%" position="absolute">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
}

export default ProgressCircle;
