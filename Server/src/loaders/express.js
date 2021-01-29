import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import api from "../api/routes/index";

export default async (app) => {
  app.enable("trust proxy");
  app.set("trust proxy", "loopback");
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  app.options("*", cors());

  app.use("/api", api);
  app.use(helmet());
  app.use(cookieParser());

  return app;
};
