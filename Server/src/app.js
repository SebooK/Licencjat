// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import path from "path";
import logger from "./src/loaders/logger";
import { error } from "./src/api/middleware/error";

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(error);

  await require("./loaders");

  app.listen(process.env.PORT || 8080, () =>
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${process.env.PORT} 🛡️
      ################################################`)
  );
}

startServer();
