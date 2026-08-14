import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockNotifications } from "../data/index.js";

async function seedNotifications() {
  try {
    await authenticateCouchDb();

    console.log("Seeding notifications...");

    for (const notification of mockNotifications) {
      const { _rev, ...document } = notification;

      try {
        await db.insert(document);

        console.log(`Inserted notification: ${notification.term}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`Notification already exists: ${notification.term}`);
          continue;
        }

        throw error;
      }
    }

    console.log("Notification seed completed.");
  } catch (error) {
    console.error("Notification seed failed:", error);

    process.exitCode = 1;
  }
}

function isConflictError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 409
  );
}

void seedNotifications();
