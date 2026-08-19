import "dotenv/config";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockReports } from "../data/mockReports.js";
import type { WeeklyReport } from "../types/index.js";

async function seedReports() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding reports...");

    for (const mockReport of mockReports) {
      const existingDocument = await getReportById(mockReport._id);

      if (existingDocument) {
        const updatedReport: WeeklyReport = {
          ...mockReport,

          _id: existingDocument._id,
          _rev: existingDocument._rev,

          docType: "weeklyReport",
          ldt: new Date().toISOString(),
        };

        await db.insert(updatedReport);

        console.log(`Updated report: ${updatedReport._id}`);
      } else {
        const newReport: WeeklyReport = {
          ...mockReport,

          docType: "weeklyReport",
          ldt: new Date().toISOString(),
        };

        await db.insert(newReport);

        console.log(`Inserted report: ${newReport._id}`);
      }
    }

    console.log("Report seed completed successfully.");
  } catch (error) {
    console.error("Report seed failed:", error);

    process.exitCode = 1;
  }
}

async function getReportById(reportId: string): Promise<WeeklyReport | null> {
  try {
    const document = await db.get(reportId);

    return document as unknown as WeeklyReport;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 404
  );
}

void seedReports();
