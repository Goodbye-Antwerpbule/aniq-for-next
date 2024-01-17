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
};

function AnswerSelectBox({
  animeList,
  onSubmit,
  isLoading,
}: AnswerButtonGroupProps) {
  const onAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) onSubmit(e.currentTarget.textContent);
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSubmit(e.target.value);
  };

  return (
    <>
      <Box pt={5} pb={150}>
        <Flex>
          <Box width="20%" />
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
          <Box width="20%" />
        </Flex>
      </Box>
    </>
  );
}

export default AnswerSelectBox;
