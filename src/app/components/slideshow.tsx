import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TextAnnotation } from "../interface/types";
import SlideShowCanvas from "./slideShowCanvas";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

type EditImageDrawerProps = {
  textPositions: TextAnnotation[][];
  imageUrls: string[];
  isDesktop: boolean;
};

const SwiperSlideShow = ({
  textPositions,
  imageUrls,
  isDesktop,
}: EditImageDrawerProps) => {
  const style = isDesktop
    ? { width: "700px", height: "500px", backgroundColor: "black" }
    : { width: "390px", height: "300px", backgroundColor: "black" };

  return (
    <>
      <Box width={700} />
      <Swiper
        navigation={true}
        modules={[Navigation, EffectCoverflow]}
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        effect={"coverflow"}
        style={style}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {imageUrls.length > 0
          ? imageUrls.map((v, k) => (
              <SwiperSlide key={k}>
                <SlideShowCanvas
                  imageUrl={v}
                  textPosition={textPositions[k]}
                  isDesktop={isDesktop}
                />
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    </>
  );
};

export default SwiperSlideShow;
