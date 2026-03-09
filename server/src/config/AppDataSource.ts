import { DataSource } from "typeorm";
import { User } from "../Entities/User.ts";
import { Task } from "../Entities/Task.ts";
import ENV_CONFIG from "./config_env.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV_CONFIG.DATABASE.DATABASE_HOST,
  port: ENV_CONFIG.DATABASE.DATABASE_PORT,
  username: ENV_CONFIG.DATABASE.DATABASE_USERNAME,
  password: ENV_CONFIG.DATABASE.DATABASE_PASSWORD,
  database: ENV_CONFIG.DATABASE.DATABASE_NAME,

  synchronize: false,
  logging: false,

  entities: [User, Task],
  migrations: ["src/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
