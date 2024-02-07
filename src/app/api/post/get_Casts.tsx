import { AnimeInfo, Cast } from "@/app/interface/types";

export const GetCasts = async (workId: number): Promise<Cast[]> => {
  const apiKey = process.env.ANNICT_API_KEY as string;
  const apiUrl = process.env.ANNICT_SEARCH_BASE_URL;
  const params = {
    per_page: "50",
    filter_work_id: workId.toString(),
    page: "1",
    access_token: apiKey,
  };
  const urlSearchParam = new URLSearchParams(params).toString();
  const endPoint = `${apiUrl}casts?${urlSearchParam}`;
  const response = await fetch(endPoint, {
    method: "GET",
  });

  const data: Cast[] = await response.json();
  return data;
};

export default GetCasts;
