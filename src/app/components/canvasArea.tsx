import React, { useEffect, memo, useRef } from "react";
import { RectangleConverter } from "../interface/editImageClass";
import { EditImageDrawer } from "../interface/editImageClass";
import { TextAnnotation } from "../interface/types";
import { Flex, Spacer, Box } from "@chakra-ui/react";

type EditImageDrawerProps = {
  textPositions: TextAnnotation[][];
  imageUrls: string[];
  isDesktop: boolean;
};

const imageWithRectanglesDrawer = new EditImageDrawer();
const rectangleConverter = new RectangleConverter();

const CanvasArea = ({
  textPositions,
  imageUrls,
  isDesktop,
}: EditImageDrawerProps) => {
  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const rectangles =
    rectangleConverter.convertTextPositionsToRectangles(textPositions);

  useEffect(() => {
    const ctx = getContext();
    ctx.clearRect(0, 0, 1500, 10000);
    isDesktop
      ? imageWithRectanglesDrawer.draw(ctx, imageUrls, rectangles, 700)
      : imageWithRectanglesDrawer.draw(ctx, imageUrls, rectangles, 390);
  }, [imageUrls, isDesktop, rectangles]);

  return (
    <>
      <Flex>
        <Box w="20%" />
        <Spacer />
        <Box>
          {isDesktop ? (
            <canvas ref={canvasRef} width={700} height={2000} />
          ) : (
            <canvas ref={canvasRef} width={414} height={2000} />
          )}
        </Box>
        <Spacer />
        <Box w="20%" />
      </Flex>
    </>
  );
};

export default memo(CanvasArea);
