import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { createGzip } from "node:zlib";
import { v4 as uuid } from "uuid";

export async function storeFile(file: Express.Multer.File) {
  const ext = file.originalname.split(".").at(-1);

  const fileName = `${uuid()}.${ext}`;
  const gzippedPath = `./uploads/${fileName}.gz`;

  await pipeline(
    Readable.from(file.buffer),
    createGzip(),
    createWriteStream(gzippedPath)
  );

  return {
    fileName,
    path: gzippedPath,
  };
}
