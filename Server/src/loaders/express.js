import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "config";
import api from "./src/api/routes/index";

export default () => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api", api);
};
