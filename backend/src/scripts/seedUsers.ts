import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockUsers } from "../data/index.js";

async function seedUsers() {
  try {
    await authenticateCouchDb();

    console.log("Seeding users...");

    for (const user of mockUsers) {
      try {
        await db.insert(user);

        console.log(`Inserted user: ${user.email}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`User already exists: ${user.email}`);

          continue;
        }

        throw error;
      }
    }

    console.log("User seed completed.");

    process.exit(0);
  } catch (error) {
    console.error("User seed failed:", error);

    process.exit(1);
  }
}

function isConflictError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  return "statusCode" in error && error.statusCode === 409;
}

void seedUsers();
