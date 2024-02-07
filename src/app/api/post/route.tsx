import { NextRequest } from "next/server";
import { getAnimeImage } from "./search_image";
import { getTextPositions } from "./recognize_text";
import { ShuffleArray } from "@/app/interface/shuffleArrayClass";
import GetCasts from "./get_Casts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("keyword:", body.keyword);
    console.log("workId:", body.workId);
    console.log("quizType:", body.quizType);

    const casts = (async () => {
      return body.quizType != "TitleFromAnimeImages"
        ? await GetCasts(body.workId)
        : [];
    })();
    const character = (async () => {
      if (
        body.quizType == "TitleFromCharacterImages" ||
        body.quizType == "CharacterFromCharacterImages"
      ) {
        const shuffleArray = new ShuffleArray();
        return shuffleArray.GetRandomArray(await casts, 1);
      }
      return [];
    })();
    if (
      body.quizType == "TitleFromCasts" ||
      body.quizType == "TitleFromCharacters"
    )
      return new Response(JSON.stringify({ casts }));
    const chara = await character;
    const rawImages =
      chara.length > 0
        ? await getAnimeImage(body.keyword)
        : await getAnimeImage(
            `${chara[0].work.title} ${chara[0].character.name}`
          );
    const imageUrls: string[] = await rawImages.items.map((v) => v.link);
    const textPositions = await getTextPositions(imageUrls);
    return new Response(
      JSON.stringify({ textPositions: textPositions, imageUrls: imageUrls })
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error" }));
  }
}
