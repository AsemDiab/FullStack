import pg from "pg";
import ENV_CONFIG from "../config/config_env.ts";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: ENV_CONFIG.DATABASE_URL,
});
