import { ImageSearchResponse } from "@/app/interface/types";

export const getAnimeImage = async (
  keyword: string
): Promise<ImageSearchResponse> => {
  const apiKey = process.env.GOOGLE_API_KEY as string;
  const engineId = process.env.GOOGLE_CUSTOME_SEARCH_ENGINE_ID as string;
  const params = {
    cx: engineId,
    lr: "lang_ja",
    num: "5",
    q: `${keyword}`,
    hl: "jp",
    hq: "アニメキャプチャ",
    searchType: "image",
    key: apiKey,
  };
  const urlSearchParam = new URLSearchParams(params).toString();

  const url = process.env.GOOGLE_CUSTOME_SEARCH_BASE_URL + urlSearchParam;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
  });
  await console.log(url);
  const json: Promise<ImageSearchResponse> = res.json();
  return json;
};
