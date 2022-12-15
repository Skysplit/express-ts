import datasource from "../datasource";
import { Request, Router } from "express";
import { File } from "../file.entity";
import multer from "multer";
import { createReadStream, ReadStream } from "node:fs";
import { access, constants as fsConstants } from "node:fs/promises";
import passport from "passport";
import { storeFile, serveFile } from "../utils";

export const fileRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

interface FileRequest extends Request {
  fileSource?: ReadStream;
}

fileRouter.use(passport.authenticate("jwt"));

fileRouter.param("fileId", async (req: FileRequest, res, next, fileId) => {
  const filteRepository = datasource.getRepository(File);

  const file = await filteRepository.findOneBy({
    id: fileId,
    user: req.user!,
  });

  if (!file) {
    throw new Error("File not found");
  }

  const { path } = file;

  try {
    await access(path, fsConstants.F_OK);
  } catch (err) {
    throw new Error("Could not access file");
  }

  req.fileSource = createReadStream(path);

  next();
});

fileRouter.post("/", upload.single("file"), async (req: FileRequest, res) => {
  const { path } = await storeFile(req.file!);
  const filteRepository = datasource.getRepository(File);

  const file = filteRepository.create({
    user: req.user,
    path,
  });

  await filteRepository.save(file);

  res.json(file);
});

fileRouter.get("/:fileId", async (req: FileRequest, res) => {
  await serveFile(req.fileSource!, res);
});
