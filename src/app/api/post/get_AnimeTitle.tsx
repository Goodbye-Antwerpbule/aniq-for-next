import { AnimeInfo } from "@/app/interface/types";

const getRandomSelection = (array: AnimeInfo[], count: number) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const AnimeList = async (): Promise<AnimeInfo[]> => {
  const apiUrl = "https://mediag.bunka.go.jp/sparql";
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

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `query=${encodeURIComponent(sparqlQuery)}&output=json`,
  });

  const data = await response.json();
  const results = data.results.bindings;
  const randomSelection: AnimeInfo[] = getRandomSelection(results, 10);

  return randomSelection;
};

export default AnimeList;
