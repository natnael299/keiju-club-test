import { db } from "../config/couchdb.js";
import type { ClubEvent } from "../types/index.js";

export const clubEventsRepository = {
  async findAll(): Promise<ClubEvent[]> {
    const result = await db.find({
      selector: {
        organizationId: {
          $exists: true,
        },
        startsAt: {
          $exists: true,
        },
        categories: {
          $exists: true,
        },
      },
    });

    return result.docs as ClubEvent[];
  },

  async findById(eventId: string): Promise<ClubEvent | null> {
    try {
      const document = await db.get(eventId);

      return document as unknown as ClubEvent;
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
        organizationId,
        startsAt: {
          $exists: true,
        },
      },
    });

    return result.docs as ClubEvent[];
  },

  async create(event: ClubEvent): Promise<ClubEvent> {
    await db.insert(event);

    return event;
  },

  async update(event: ClubEvent): Promise<ClubEvent> {
    const current = await db.get(event._id);

    const updatedEvent = {
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
