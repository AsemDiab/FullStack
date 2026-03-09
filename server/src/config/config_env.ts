import dotenv from "dotenv";
dotenv.config();
export const ENV_CONFIG = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE: {
    DATABASE_TYPE: process.env.DATABASE_TYPE ?? "postgres",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT ?? "5432"),
  },
  JWT: {
    SECRET: process.env.JWT_SECRET!,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
  },
  Security: {
    passwordSalt: parseInt(process.env.Salt ?? "10"),
    PASSWORDPEPPER: process.env.PEPPER,
  },
};
export default ENV_CONFIG;
