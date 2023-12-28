export interface ImageSearchItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  image: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface ImageSearchResponse {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: Array<{
      title: string;
      totalResults: number;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
    nextPage: Array<{
      title: string;
      totalResults: number;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
  };
  context: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: number;
    formattedTotalResults: string;
  };
  items: ImageSearchItem[];
}

export interface VisionRequest {
  image: {
    source: {
      imageUri: string;
    };
  };
  features: Array<{
    type: "TEXT_DETECTION";
  }>;
}

export interface TextAnnotation {
  description: string;
  boundingPoly: {
    vertices: { x: number; y: number }[];
  };
}

export interface AnimeInfo {
  year: { type: string; value: string };
  animeTitle: { type: string; value: string };
}

export interface AnimeData {
  id: number;
  series_id: number | null;
  title: string;
  season: "spring" | "summer" | "autumn" | "winter";
  year: number;
}

export interface Rectangle {
  width: number;
  height: number;
  position: { x: number; y: number };
  color: string;
}
