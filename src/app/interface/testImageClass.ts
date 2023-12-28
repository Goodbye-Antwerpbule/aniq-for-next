import { Rectangle, TextAnnotation } from "./types";

export class EditImageDrawer {
  draw(
    canvasContext: CanvasRenderingContext2D | null,
    imageUrls: string[], // 画像の URL が入った string[]
    rectangles: Rectangle[][],
    inputWidth: number
  ) {
    if (!canvasContext) {
      console.error("Canvas context is null.");
      return;
    }

    let sumHeight = 0;

    // 各画像と対応する四角形を描画
    imageUrls.slice(0, rectangles.length).forEach((imageUrl, i) => {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        let scaledWidth = image.naturalWidth;
        let scaledHeight = image.naturalHeight;

        const scaleFactor = Math.min(
          1,
          inputWidth / image.naturalWidth,
          inputWidth / image.naturalHeight
        );
        // 画像が700pxを超える場合のみ縮小
        if (
          image.naturalWidth > inputWidth ||
          image.naturalHeight > inputWidth
        ) {
          scaledWidth *= scaleFactor;
          scaledHeight *= scaleFactor;
          console.log("scaleChanged :" + image.src);
        }

        canvasContext.drawImage(image, 0, sumHeight, scaledWidth, scaledHeight);

        rectangles[i].forEach((rectangle) => {
          let scaledRectWidth = rectangle.width;
          let scaledRectHeight = rectangle.height;

          // 四角形も700pxを超える場合のみ縮小
          if (
            image.naturalWidth > inputWidth ||
            image.naturalHeight > inputWidth
          ) {
            const rectScaleFactorX = scaledWidth / image.naturalWidth;
            const rectScaleFactorY = scaledHeight / image.naturalHeight;
            scaledRectWidth *= rectScaleFactorX;
            scaledRectHeight *= rectScaleFactorY;
          }

          const scaledX =
            rectangle.position.x * (scaledWidth / image.naturalWidth);
          const scaledY =
            rectangle.position.y * (scaledHeight / image.naturalHeight) +
            sumHeight;

          canvasContext.fillStyle = rectangle.color;
          canvasContext.fillRect(
            scaledX,
            scaledY,
            scaledRectWidth,
            scaledRectHeight
          );
        });

        sumHeight += scaledHeight;
      };
    });
  }
}

export class RectangleConverter {
  convertTextPositionsToRectangles(
    textAnnotations: TextAnnotation[][]
  ): Rectangle[][] {
    const rectangles: Rectangle[][] = [];

    textAnnotations.forEach((annotationRow) => {
      const rowRectangles: Rectangle[] = [];

      annotationRow.forEach((annotation, index) => {
        if (index === 0) {
          // annotationRow の要素番号が0のときは描画処理をスキップ
          return;
        }

        const vertices = annotation.boundingPoly.vertices;

        // 左上端の座標
        const topLeftX =
          Math.min(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x) -
          70;
        const topLeftY =
          Math.min(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y) -
          50;
        const width = Math.abs(vertices[0].x - vertices[1].x) + 120;
        const height = Math.abs(vertices[1].y - vertices[2].y) + 100;

        rowRectangles.push({
          width,
          height,
          position: { x: topLeftX, y: topLeftY },
          color: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256
          )},${Math.floor(Math.random() * 256)})`,
        });
      });

      rectangles.push(rowRectangles);
    });

    return rectangles;
  }
}
