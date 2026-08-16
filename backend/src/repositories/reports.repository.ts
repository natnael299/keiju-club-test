import { db } from "../config/couchdb.js";
import type { WeeklyReport } from "../types/index.js";

export const reportsRepository = {
  async findAll(): Promise<WeeklyReport[]> {
    const result = await db.find({
      selector: {
        docType: "weeklyReport",
      },
    });

    return result.docs as WeeklyReport[];
  },

  async findByOwnerId(ownerId: string): Promise<WeeklyReport[]> {
    const result = await db.find({
      selector: {
        docType: "weeklyReport",
        ownerId,
      },
    });

    return result.docs as WeeklyReport[];
  },

  async findById(reportId: string): Promise<WeeklyReport | null> {
    try {
      const document = await db.get(reportId);

      const report = document as unknown as WeeklyReport;

      if (report.docType !== "weeklyReport") {
        return null;
      }

      return report;
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  },
};

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 404
  );
}
