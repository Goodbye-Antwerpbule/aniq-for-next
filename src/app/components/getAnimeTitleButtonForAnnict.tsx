import { AnimeData } from "@/app/interface/types";
import { Button } from "@chakra-ui/react";

function GetRandomSelection<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}

type AnimeTitleButtonProps = {
  onSubmit: <T extends AnimeData>(list: T[]) => void;
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
      const shuffledData = GetRandomSelection(data, 80);
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
