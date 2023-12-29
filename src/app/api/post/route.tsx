import { NextRequest } from "next/server";
import { getAnimeImage } from "./search_image";
import { getTextPositions } from "./recognize_text";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body.keyword);
    const rawImages = await getAnimeImage(body.keyword, body.year);
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
