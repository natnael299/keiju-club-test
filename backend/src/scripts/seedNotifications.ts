import "dotenv/config";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockNotifications } from "../data/index.js";
import type { RawNotification } from "../types/index.js";

async function seedNotifications() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding notifications...");

    for (const mockNotification of mockNotifications) {
      const existingDocument = await getNotificationById(mockNotification._id);

      if (existingDocument) {
        const updatedNotification: RawNotification = {
          ...mockNotification,

          _id: existingDocument._id,
          _rev: existingDocument._rev,

          docType: "notification",
          ldt: new Date().toISOString(),
        };

        await db.insert(updatedNotification);

        console.log(`Updated notification: ${updatedNotification.term}`);
      } else {
        const newNotification: RawNotification = {
          ...mockNotification,

          docType: "notification",
          ldt: new Date().toISOString(),
        };

        await db.insert(newNotification);

        console.log(`Inserted notification: ${newNotification.term}`);
      }
    }

    console.log("Notification seed completed successfully.");
  } catch (error) {
    console.error("Notification seed failed:", error);

    process.exitCode = 1;
  }
}

async function getNotificationById(
  notificationId: string,
): Promise<RawNotification | null> {
  try {
    const document = await db.get(notificationId);

    return document as unknown as RawNotification;
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

void seedNotifications();
