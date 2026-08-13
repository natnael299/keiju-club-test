import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockOwners } from "../data/index.js";

async function seedOwners() {
  try {
    await authenticateCouchDb();

    console.log("Seeding owners...");

    for (const owner of mockOwners) {
      try {
        await db.insert(owner);

        console.log(`Inserted owner: ${owner.fullName}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`Owner already exists: ${owner.fullName}`);

          continue;
        }

        throw error;
      }
    }

    console.log("Owner seed completed.");
  } catch (error) {
    console.error("Owner seed failed:", error);

    process.exitCode = 1;
  }
}

function isConflictError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  return "statusCode" in error && error.statusCode === 409;
}

void seedOwners();
