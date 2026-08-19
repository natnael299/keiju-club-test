import "dotenv/config";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockClubEvents } from "../data/index.js";
import type { ClubEvent } from "../types/index.js";

async function seedClubEvents() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding Club events...");

    for (const mockEvent of mockClubEvents) {
      const existingDocument = await getEventById(mockEvent._id);

      if (existingDocument) {
        const updatedEvent: ClubEvent = {
          ...mockEvent,

          _id: existingDocument._id,
          _rev: existingDocument._rev,

          docType: "clubEvent",
          ldt: new Date().toISOString(),
        };

        await db.insert(updatedEvent);

        console.log(`Updated event: ${updatedEvent.title}`);
      } else {
        const newEvent: ClubEvent = {
          ...mockEvent,

          docType: "clubEvent",
          ldt: new Date().toISOString(),
        };

        await db.insert(newEvent);

        console.log(`Inserted event: ${newEvent.title}`);
      }
    }

    console.log("Club event seed completed successfully.");
  } catch (error) {
    console.error("Club event seed failed:", error);

    process.exitCode = 1;
  }
}

async function getEventById(eventId: string): Promise<ClubEvent | null> {
  try {
    const document = await db.get(eventId);

    return document as unknown as ClubEvent;
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

void seedClubEvents();
