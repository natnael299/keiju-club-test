import { db } from "../config/couchdb.js";
import type { ClubEvent } from "../types/index.js";

export const clubEventsRepository = {
  async findAll(): Promise<ClubEvent[]> {
    const result = await db.find({
      selector: {
        docType: "clubEvent",
      },
    });

    return result.docs as ClubEvent[];
  },

  async findById(eventId: string): Promise<ClubEvent | null> {
    try {
      const document = await db.get(eventId);

      const event = document as unknown as ClubEvent;

      if (event.docType !== "clubEvent") {
        return null;
      }

      return event;
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  },

  async findByOrganizationId(organizationId: string): Promise<ClubEvent[]> {
    const result = await db.find({
      selector: {
        docType: "clubEvent",
        organizationId,
      },
    });

    return result.docs as ClubEvent[];
  },

  async create(event: ClubEvent): Promise<ClubEvent> {
    const response = await db.insert(event);

    return {
      ...event,
      _rev: response.rev,
    };
  },

  async update(event: ClubEvent): Promise<ClubEvent> {
    const current = await db.get(event._id);

    const currentEvent = current as unknown as ClubEvent;

    if (currentEvent.docType !== "clubEvent") {
      throw new Error("Document is not a club event.");
    }

    const updatedEvent: ClubEvent = {
      ...event,
      _rev: current._rev,
    };

    const response = await db.insert(updatedEvent);

    return {
      ...updatedEvent,
      _rev: response.rev,
    };
  },

  async remove(eventId: string): Promise<void> {
    const document = await db.get(eventId);

    const event = document as unknown as ClubEvent;

    if (event.docType !== "clubEvent") {
      throw new Error("Document is not a club event.");
    }

    await db.destroy(eventId, document._rev);
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
