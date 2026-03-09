import { MIGRATION_QUERY } from "./constants.ts";
import { pool } from "./PostgresqlDB.ts";

export const migrate = async () => {
  await pool.query(MIGRATION_QUERY);

  console.log("Migration complete");
};
