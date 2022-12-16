import "reflect-metadata";
import { createServer } from "node:http";
import express from "express";
import { Server, Socket } from "socket.io";
import datasource from "./datasource";
import { fileRouter } from "./routes/fileRouter";
import { authRouter } from "./routes/authRouter";
import { passport } from "./auth";

const wrap =
  (middleware: express.RequestHandler) => (socket: Socket, next: Function) =>
    middleware(
      socket.request as express.Request,
      {} as express.Response,
      next as express.NextFunction
    );

(async () => {
  await datasource.initialize();
  const port = process.env.PORT ?? 8080;
  const app = express();
  const server = createServer(app);

  const io = new Server(server, {
    serveClient: false,
  });

  app.use(express.json());
  app.use(passport.initialize());
  app.use("/files", fileRouter);
  app.use("/auth", authRouter);

  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.authenticate("jwt")));
  io.on("connection", (socket) => {
    console.log(socket.request.headers);
    console.log("Connected to socket!");
  });

  server.listen(+port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Killing server");
    });
  });
})();
