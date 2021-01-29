import express from "express";
import bodyParser from "body-parser";
import path from "path";
import logger from "./loaders/logger";
import error from "./api/middleware/error";
import config from "./config/config";

require("./loaders/express");

const app = express();
async function startServer() {
  app.use(error);
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  await require("./loaders/express").default(app);

  /// catch 404 and forward to error handler

  app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    res.header("Allow", " GET,POST, OPTIONS, PUT, DELETE");
    res.status(404).json(err);
  });

  // error handler

  app.use((err, req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    return res.status(err.status || 500).send({ error: err });
  });
  app.listen(config.port, () =>
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################`)
  );
}

startServer();
