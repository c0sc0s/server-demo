import path from "path";

import { logDir } from "./utils/logger";

export const loggerConfig = {
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      destination: path.join(logDir, `app-readable.log`),
      translateTime: "SYS:standard",
      colorize: false,
      singleLine: true,
    },
  },
};
