"use client";
import {
  Box,
  ButtonGroup,
  Center,
  useMediaQuery,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { AnimeData, QuizResult, TextAnnotation } from "@/app/interface/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressCircle from "../components/progressCircle";
import GetAnimeTitleButtonForAnnict from "../components/getAnimeTitleButtonForAnnict";
import { ShuffleArray } from "../interface/shuffleArrayClass";
import SwiperSlideShow from "../components/slideshow";
import AnswerSelectBox from "../components/answerSelectBox";
export default function Home() {
  const [textPositions, setTextPositions] = useState<TextAnnotation[][]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [animeTitles, setAnimeTitles] = useState<AnimeData[]>([]);
  const [inputText, setInputText] = useState("");
  const [gameCnt, setGameCnt] = useState(0);
  const [lifeCnt, setLifeCnt] = useState(1);
  const [result, setResult] = useState<QuizResult[]>([]);
  const selectedYear = [1990, 2000, 2010, 2020];
  const [shuffleAnimeList, setShuffleAnimeList] = useState<AnimeData[]>([]);
  const [isLoading, setIsLoding] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const router = useRouter();
  const toast = useToast();

  const onToggleLoading = (value: boolean) => {
    setIsLoding(value);
  };

  //set init quiz
  const onSetAnime = <T extends AnimeData>(list: T[]): void => {
    setAnimeTitles(list);
    setIsDisabled(true);
  };

  //set next quiz
  const onDoNext = (title: string) => {
    setIsLoding(true);
    if (inputText == title) {
      setResult([
        ...result,
        { animeData: animeTitles[gameCnt], isCorrected: true },
      ]);
      toast({
        title: " 正解　◯ ",
        position: "top",
        colorScheme: "pink",
      });
    } else {
      setResult([
        ...result,
        { animeData: animeTitles[gameCnt], isCorrected: false },
      ]);
      toast({
        title: "不正解　✕ ",
        position: "top",
        colorScheme: "blue",
      });
      setLifeCnt(lifeCnt - 1);
    }
    setGameCnt(gameCnt + 1);
  };

  const setArrayToALocalStrage = (array: QuizResult[]) => {
    localStorage.setItem(
      "paramTitle",
      JSON.stringify(array.map((v) => v.animeData.title))
    );
    localStorage.setItem(
      "paramYear",
      JSON.stringify(array.map((v) => v.animeData.year))
    );
    localStorage.setItem(
      "paramSeason",
      JSON.stringify(array.map((v) => v.animeData.season))
    );
    localStorage.setItem(
      "paramCorrect",
      JSON.stringify(array.map((v) => v.isCorrected))
    );
  };

  //get & set images
  useEffect(() => {
    if (inputText) {
      const load = async () => {
        const res = await fetch("/api/post", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            keyword: "キノの旅 the Beautiful World",
          }),
        });
        const json: { textPositions: TextAnnotation[][]; imageUrls: string[] } =
          await res.json();
        setTextPositions(json.textPositions);
        setImageUrls(json.imageUrls);
        setIsLoding(false);
        console.log(json);
      };
      load();
    }
  }, [inputText]);

  //set title
  useEffect(() => {
    if (animeTitles.length > 0 && gameCnt < animeTitles.length) {
      setInputText(animeTitles[gameCnt].title);
      const shuffleArray = new ShuffleArray();
      setShuffleAnimeList(
        shuffleArray.GetRandomSelection(animeTitles, gameCnt, 8)
      );
    }
  }, [animeTitles, gameCnt]);

  //set result
  useEffect(() => {
    if (animeTitles.length > 0 && (gameCnt == 100 || lifeCnt == 0)) {
      setArrayToALocalStrage(result);
      router.push(`/quiz/result`);
    }
  }, [gameCnt, result, router, lifeCnt, animeTitles.length]);
  return (
    <>
      <div>
        <ProgressCircle isLoading={isLoading} />
        {/* <Input type="text" value={inputText} readOnly /> */}
        <Box>
          <Center>
            <ButtonGroup py={5} display="inline-flex" size="sm">
              {selectedYear.map((year, key) => (
                <Box px={1} key={key}>
                  <GetAnimeTitleButtonForAnnict
                    onSubmit={onSetAnime}
                    onToggleLoading={onToggleLoading}
                    isDisabled={isDisabled}
                    selectedYear={year}
                  />
                </Box>
              ))}
            </ButtonGroup>
          </Center>
        </Box>

        <Center py="3">
          <Heading>{inputText ? `〈問${gameCnt + 1}〉` : "〈問#〉"}</Heading>
        </Center>
        <h3>anime image</h3>
        <SwiperSlideShow
          textPositions={textPositions}
          imageUrls={imageUrls}
          isDesktop={isLargerThan500}
        />
        <AnswerSelectBox
          animeList={shuffleAnimeList}
          onSubmit={onDoNext}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
