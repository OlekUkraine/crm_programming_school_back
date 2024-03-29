import { config } from "dotenv";

const environment = process.env.NODE_ENV ?? "";
config({ path: `environments/${environment}.env` });

export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  SECRET_SALT: process.env.SECRET_SALT,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
  JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

  LIFETIME_ACCESS_TOKEN: process.env.LIFETIME_ACCESS_TOKEN,
  LIFETIME_REFRESH_TOKEN: process.env.LIFETIME_REFRESH_TOKEN,
  LIFETIME_ACTIVATE_TOKEN: process.env.LIFETIME_ACTIVATE_TOKEN,

  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,

  FRONT_PORT: process.env.FRONT_PORT,
  FRONT_URL: process.env.FRONT_URL,
};
