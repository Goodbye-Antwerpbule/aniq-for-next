import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "post",
    "json",
    `anime_${body.selectedYear}.json`
  );

  const data = fs.readFileSync(filePath, "utf-8");
  const resData = JSON.stringify(data);

  return new Response(resData);
}
