import { AnimeData } from "@/app/interface/types";
import { Button } from "@chakra-ui/react";
import { ShuffleArray } from "../interface/shuffleArrayClass";

type AnimeTitleButtonProps = {
  onSubmit: (list: AnimeData[]) => void;
  onToggleLoading: (value: boolean) => void;

  isDisabled: boolean;
  selectedYear: number;
};

function getAnimeTitleButtonForAnnict({
  onSubmit,
  onToggleLoading,
  isDisabled,
  selectedYear,
}: AnimeTitleButtonProps) {
  const getAnimeTitle = () => {
    const url = "/api/post/json/";
    const load = async () => {
      onToggleLoading(true);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ selectedYear: selectedYear }),
      });

      const res = await response.json();
      const data: AnimeData[] = JSON.parse(res).animeData;
      const shuffleArray = new ShuffleArray();
      const shuffledData = shuffleArray.shuffleArray(data);
      onSubmit(shuffledData);
      onToggleLoading(false);
    };
    load();
  };

  return (
    <Button isDisabled={isDisabled} onClick={getAnimeTitle}>
      {selectedYear}年代
    </Button>
  );
}

export default getAnimeTitleButtonForAnnict;
