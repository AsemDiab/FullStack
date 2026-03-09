import "reflect-metadata";
import app from "./app.ts";
import { AppDataSource } from "./config/AppDataSource.ts";
import ENV_CONFIG from "./config/config_env.ts";

const PORT = ENV_CONFIG.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => console.log("error occurred caused the server not to work", e));
