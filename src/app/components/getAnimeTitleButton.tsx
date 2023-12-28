import { AnimeInfo } from "@/app/interface/types";
import { Button } from "@chakra-ui/react";

function GetRandomSelection(array: AnimeInfo[], count: number) {
  const shuffled = array.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}

type AnimeTitleButtonProps = {
  onSubmit: (list: AnimeInfo[]) => void;
  onToggle: (value: boolean) => void;
};

function getAnimeTitleButton({ onSubmit, onToggle }: AnimeTitleButtonProps) {
  const getAnimeTitle = () => {
    const url = "https://mediag.bunka.go.jp/sparql";
    const sparqlQuery = `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX schema: <https://schema.org/>
        SELECT DISTINCT ?year ?animeTitle
        WHERE {
          ?anime schema:genre "アニメテレビ番組";
                schema:datePublished ?publishDate;
                schema:name ?animeTitle.
          BIND (SUBSTR(?publishDate, 1, 4) AS ?year)
          FILTER (?year >= "2010" && ?year <= "2020")
          FILTER (LANG(?animeTitle) != "ja-hrkt")
        }
        ORDER BY DESC(?year)
      `;
    const load = async () => {
      onToggle(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `query=${encodeURIComponent(sparqlQuery)}&output=json`,
      });

      const data = await response.json();
      const results = data.results.bindings;

      const randomSelection: AnimeInfo[] = GetRandomSelection(results, 80);
      onSubmit(randomSelection);
      onToggle(false);
    };
    load();
  };

  return <Button onClick={getAnimeTitle}>2010年代</Button>;
}

export default getAnimeTitleButton;
