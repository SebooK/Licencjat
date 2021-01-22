import { readFileSync } from "fs";
import { Sequelize } from "sequelize";
import winston from "../logger/logger";

const env = process.env.NODE_ENV || "development";
const dbConfig = JSON.parse(
  readFileSync("../Server/src/config/config.json", (err, data) => {
    if (err) throw err;
    winston.info(data);
  })
);

const { development } = dbConfig;
const { production } = dbConfig;
let sequelize;
if (env === "development") {
  sequelize = new Sequelize(
    development.database,
    development.username,
    development.password,
    {
      host: development.host,
      dialect: development.dialect,
      port: development.port,
    }
  );
} else {
  sequelize = new Sequelize(
    production.database,
    production.username,
    production.password,
    {
      host: production.host,
      dialect: production.dialect,
      port: production.port,
    }
  );
}
sequelize
  .authenticate()
  .then(() => winston.info("Connection has been established successfully"))
  .catch((err) => winston.error("Unable to connect to the database:", err));
export default sequelize;
