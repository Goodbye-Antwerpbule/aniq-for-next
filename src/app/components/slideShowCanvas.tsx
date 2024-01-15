import React, { useEffect, memo, useRef, useState } from "react";
import {
  SlideShowEditImageDrawer,
  SlideShowRectangleConverter,
} from "../interface/editImageForSlideShowClass";
import { TextAnnotation } from "../interface/types";
import { Box, Center } from "@chakra-ui/react";

type EditImageDrawerProps = {
  textPosition: TextAnnotation[];
  imageUrl: string;
  isDesktop: boolean;
};

const imageWithRectanglesDrawer = new SlideShowEditImageDrawer();
const rectangleConverter = new SlideShowRectangleConverter();

const CanvasArea = ({
  textPosition,
  imageUrl,
  isDesktop,
}: EditImageDrawerProps) => {
  const canvasRef = useRef(null);

  const getContext = (canvas: any): CanvasRenderingContext2D => {
    return canvas.getContext("2d");
  };
  const rectangles =
    rectangleConverter.convertTextPositionsToRectangles(textPosition);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = getContext(canvas);
    ctx.clearRect(0, 0, 1000, 2000);
    if (imageUrl) {
      isDesktop
        ? imageWithRectanglesDrawer.draw(canvas, ctx, imageUrl, rectangles, 700)
        : imageWithRectanglesDrawer.draw(
            canvas,
            ctx,
            imageUrl,
            rectangles,
            390
          );
    }
  }, [imageUrl, isDesktop, rectangles]);

  return (
    <>
      {isDesktop ? (
        <canvas ref={canvasRef} width={700} height={500} />
      ) : (
        <canvas ref={canvasRef} width={390} height={300} />
      )}
    </>
  );
};

export default CanvasArea;
