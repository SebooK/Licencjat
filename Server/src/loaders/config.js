import config from "../config/config";
import logger from "./logger";

export default function () {
  if (!config.jwtSecret) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");

    // process.exit(1);
  }
}
