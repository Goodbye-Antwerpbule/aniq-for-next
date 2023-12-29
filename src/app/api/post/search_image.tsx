import { ImageSearchResponse } from "@/app/interface/types";
import { Console } from "console";

export const getAnimeImage = async (
  keyword: string,
  year: number
): Promise<ImageSearchResponse> => {
  const apiKey = process.env.GOOGLE_API_KEY as string;
  const engineId = process.env.GOOGLE_CUSTOME_SEARCH_ENGINE_ID as string;
  const regex = /[-　]|～[^～]+～/g;
  const terms = year < 2010 ? "アニメyoutube" : "アニメキャプチャ";
  console.log(terms);
  const params = {
    cx: engineId,
    lr: "lang_ja",
    num: "5",
    q: `${keyword.replace(regex, "")}`,
    hl: "jp",
    onTerms: terms,
    searchType: "image",
    siteSearch: "www.facebook.com www.tiktok.com",
    siteSearchFilter: "e",
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
