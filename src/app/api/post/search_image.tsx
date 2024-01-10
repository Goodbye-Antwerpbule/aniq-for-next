import { ImageSearchResponse } from "@/app/interface/types";

export const getAnimeImage = async (
  keyword: string
): Promise<ImageSearchResponse> => {
  const apiKey = process.env.GOOGLE_API_KEY as string;
  const engineId = process.env.GOOGLE_CUSTOME_SEARCH_ENGINE_ID as string;
  const regex = /[-　]|～[^～]+～/g;
  const params = {
    cx: engineId,
    lr: "lang_ja",
    num: "5",
    q: `${keyword.replace(regex, "")}`,
    hl: "jp",
    orTerms: "アニメシーン",
    searchType: "image",
    siteSearch:
      " play.google.com www.facebook.com www.tiktok.com nijigencospa.com blushmedia.ug www.reddit.com www.metaverse-style.com m.startribune.com www.amazon.com",
    siteSearchFilter: "e",
    key: apiKey,
  };
  const urlSearchParam = new URLSearchParams(params).toString();

  const url = process.env.GOOGLE_CUSTOME_SEARCH_BASE_URL + urlSearchParam;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    referrer: "https://aniq.vercel.app",
  });
  await console.log(url);
  const json: Promise<ImageSearchResponse> = res.json();
  return json;
};
