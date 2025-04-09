const { createLogger, format, transports } = require("winston");
const { json, combine, timestamp, colorize, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  // return `${timestamp} ${level}: ${message}`;
  return `${level}: ${message}`;
});

const isProduction = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: isProduction ? "info" : "debug",
  format: timestamp(),
  transports: [
    new transports.File({ filename: "logs/combined.log", format: json() }),
  ],
});

if (!isProduction) {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
  );
}

exports.logger = logger;
