import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockClubEvents } from "../data/index.js";

async function seedClubEvents() {
  try {
    await authenticateCouchDb();

    console.log("Seeding club events...");

    for (const event of mockClubEvents) {
      try {
        await db.insert(event);

        console.log(`Inserted event: ${event.title}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`Event already exists: ${event.title}`);
          continue;
        }

        throw error;
      }
    }

    console.log("Club event seed completed.");
  } catch (error) {
    console.error("Club event seed failed:", error);

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

void seedClubEvents();
