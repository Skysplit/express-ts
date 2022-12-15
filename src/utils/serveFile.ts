import { pipeline } from "node:stream/promises";
import { Readable, Writable } from "node:stream";
import { createGunzip } from "node:zlib";

export async function serveFile(source: Readable, destination: Writable) {
  await pipeline(source, createGunzip(), destination);
}
