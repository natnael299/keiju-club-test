import app from "./app.js";
import { PORT } from "./config/env.js";
import { initDatabase } from "./config/initDatabase.js";

async function startServer() {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    process.exit(1);
  }
}

void startServer();
