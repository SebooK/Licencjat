import pkg from "winston";
import { join } from "path";

const { createLogger, format, transports } = pkg;
const { combine, timestamp, printf } = format;
const colorizer = format.colorize();
const timeZone = () =>
  new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });
const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
  },
  format: combine(
    timestamp({ format: timeZone }),
    printf((info) =>
      colorizer.colorize(
        info.level,
        `[${info.timestamp}]  [${info.level.toUpperCase()}]: ${info.message}`
      )
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: combine(timestamp({ format: timeZone })),
      prettyPrint: true,
      colorize: true,
    }),
    new transports.File({
      filename: join(__dirname, "../logs/error.log"),
      level: "error",
      format: format.json(),
      prettyPrint: true,
      timestamp: true,
    }),
  ],
  exceptionHandlers: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({
      filename: join(__dirname, "../logs/uncaughtExceptions.log"),
      level: "error",
      format: format.json(),
      timestamp: true,
    }),
  ],
});
process.on("unhandledRejection", (ex) => {
  throw ex;
});

export default logger;
