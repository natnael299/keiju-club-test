import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockReports } from "../data/mockReports.js";

async function seedReports() {
  try {
    await authenticateCouchDb();

    console.log("Seeding reports...");

    for (const report of mockReports) {
      try {
        await db.insert(report);

        console.log(`Inserted report: ${report._id}`);
      } catch (error) {
        if (isConflictError(error)) {
          console.log(`Report already exists: ${report._id}`);
          continue;
        }

        throw error;
      }
    }

    console.log("Report seed completed.");
  } catch (error) {
    console.error("Report seed failed:", error);

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

void seedReports();
