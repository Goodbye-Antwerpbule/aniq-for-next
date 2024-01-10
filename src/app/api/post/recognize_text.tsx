import { TextAnnotation, VisionRequest } from "@/app/interface/types";
export const getTextPositions = async (
  imageUrls: string[]
): Promise<TextAnnotation[][]> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const apiUrl = `${process.env.GOOGLE_CLOUD_VISION_BASE_URL}key=${apiKey}`;

  const requests: VisionRequest[] = imageUrls.map((imageUrl) => ({
    image: {
      source: {
        imageUri: imageUrl,
      },
    },
    features: [
      {
        type: "TEXT_DETECTION",
      },
    ],
  }));

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://aniq.vercel.app",
    body: JSON.stringify({ requests }),
  });
  const result = await response.json();

  // 各画像の応答からtextAnnotationsを抽出
  const responseTextAnnotations: TextAnnotation[][] = (
    result.responses || []
  ).map((r: any) => r.textAnnotations || []);
  return responseTextAnnotations;
};
