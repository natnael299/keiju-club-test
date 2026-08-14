import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockOrganizations } from "../data/index.js";

async function seedOrganizations() {
  try {
    await authenticateCouchDb();

    console.log("Seeding organizations...");

    for (const organization of mockOrganizations) {
      try {
        await db.insert(organization);

        console.log(`Inserted organization: ${organization.name}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`Organization already exists: ${organization.name}`);
          continue;
        }

        throw error;
      }
    }

    console.log("Organization seed completed.");
  } catch (error) {
    console.error("Organization seed failed:", error);

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

void seedOrganizations();
