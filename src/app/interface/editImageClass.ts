import { Rectangle, TextAnnotation } from "./types";

export class EditImageDrawer {
  imageUrls: string[]; // 画像の URL が入った string[]
  rectangles: Rectangle[][];
  images: HTMLImageElement[];

  constructor(imageUrls: string[], rectangles: Rectangle[][]) {
    this.imageUrls = imageUrls;
    this.rectangles = rectangles;
    this.images = [];
  }

  draw(canvasContext: CanvasRenderingContext2D | null) {
    if (!canvasContext) {
      console.error("Canvas context is null.");
      return;
    }

    let sumHeight = 0;

    // 各画像と対応する四角形を描画
    this.imageUrls.slice(0, this.rectangles.length).map((imageUrl, i) => {
      const image = new Image();
      image.src = imageUrl;
      this.images[i] = image;

      image.onload = () => {
        canvasContext.drawImage(image, 0, sumHeight);

        this.rectangles[i].forEach((rectangle) => {
          canvasContext.fillStyle = rectangle.color;
          canvasContext.fillRect(
            rectangle.position.x,
            rectangle.position.y + sumHeight,
            rectangle.width,
            rectangle.height
          );
        });

        sumHeight += this.images[i].height;
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
          color: "gray",
        });
      });

      rectangles.push(rowRectangles);
    });

    return rectangles;
  }
}
