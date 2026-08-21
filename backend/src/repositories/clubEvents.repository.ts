import { db } from "../config/couchdb.js";

import type { ClubEvent } from "../types/index.js";

const MAX_UPDATE_ATTEMPTS = 3;

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
    for (let attempt = 1; attempt <= MAX_UPDATE_ATTEMPTS; attempt += 1) {
      const currentDocument = await db.get(event._id);

      const currentEvent = currentDocument as unknown as ClubEvent;

      if (currentEvent.docType !== "clubEvent") {
        throw new Error("Document is not a club event.");
      }

      const updatedEvent: ClubEvent = {
        ...event,
        _rev: currentDocument._rev,
      };

      try {
        const response = await db.insert(updatedEvent);

        return {
          ...updatedEvent,
          _rev: response.rev,
        };
      } catch (error) {
        const shouldRetry =
          isConflictError(error) && attempt < MAX_UPDATE_ATTEMPTS;

        if (!shouldRetry) {
          throw error;
        }
      }
    }

    throw new Error("The event could not be updated after multiple attempts.");
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

function isNotFoundError(error: unknown): boolean {
  return hasStatusCode(error, 404);
}

function isConflictError(error: unknown): boolean {
  return hasStatusCode(error, 409);
}

function hasStatusCode(error: unknown, expectedStatusCode: number): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === expectedStatusCode
  );
}
