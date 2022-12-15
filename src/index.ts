import "reflect-metadata";
import express from "express";
import datasource from "./datasource";
import { fileRouter } from "./routes/fileRouter";
import { authRouter } from "./routes/authRouter";
import { passport } from "./auth";

(async () => {
  await datasource.initialize();
  const port = process.env.PORT ?? 8080;
  const app = express();

  app.use(express.json());
  app.use(passport.initialize());
  app.use("/files", fileRouter);
  app.use("/auth", authRouter);

  const server = app.listen(+port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Killing server");
    });
  });
})();
