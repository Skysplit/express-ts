import "reflect-metadata";
import express from "express";

(async () => {
  const port = process.env.PORT ?? 8080;
  const app = express();

  app.get("/", async (req, res) => {
    res.json({
      hello: "world",
    });
  });

  const server = app.listen(+port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Killing server");
    });
  });
})();
