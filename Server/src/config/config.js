import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your  port
   */

  port: parseInt(process.env.PORT, 10),

  /**
   * Your secret sauce
   */

  jwtPrivateKey: process.env.jwtPrivateKey,

  /**
   * API configs
   */

  api: {
    prefix: "/api",
  },

  database: {
    development: {
      username: "root",
      password: "admin",
      database: "licencjat",
      host: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false,
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false,
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      ost: "127.0.0.1",
      dialect: "mysql",
      operatorsAliases: false,
    },
  },
};
