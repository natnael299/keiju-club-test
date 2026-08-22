import { db } from "../config/couchdb.js";

import type { ClubEvent } from "../types/index.js";

const MAX_UPDATE_ATTEMPTS = 3;
const EVENT_IMAGE_ATTACHMENT = "event-image";

type EventDocumentWithAttachments = ClubEvent & {
  _attachments?: Record<
    string,
    {
      content_type?: string;
      stub?: boolean;
      length?: number;
    }
  >;
};

type EventImage = {
  buffer: Buffer;
  contentType: string;
};

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

      const currentEvent =
        currentDocument as unknown as EventDocumentWithAttachments;

      if (currentEvent.docType !== "clubEvent") {
        throw new Error("Document is not a club event.");
      }

      const updatedEvent: EventDocumentWithAttachments = {
        ...currentEvent,
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

  async saveImage(
    eventId: string,
    imageBuffer: Buffer,
    contentType: string,
  ): Promise<ClubEvent | null> {
    for (let attempt = 1; attempt <= MAX_UPDATE_ATTEMPTS; attempt += 1) {
      const currentEvent = await this.findById(eventId);

      if (!currentEvent) {
        return null;
      }

      try {
        await db.attachment.insert(
          eventId,
          EVENT_IMAGE_ATTACHMENT,
          imageBuffer,
          contentType,
          {
            rev: currentEvent._rev,
          },
        );

        const refreshedDocument = await db.get(eventId);

        const refreshedEvent =
          refreshedDocument as unknown as EventDocumentWithAttachments;

        if (refreshedEvent.docType !== "clubEvent") {
          throw new Error("Document is not a club event.");
        }

        const eventWithImage: EventDocumentWithAttachments = {
          ...refreshedEvent,
          imageUrl: `/api/club-events/${eventId}/image`,
          ldt: new Date().toISOString(),
        };

        const updateResponse = await db.insert(eventWithImage);

        return {
          ...eventWithImage,
          _rev: updateResponse.rev,
        };
      } catch (error) {
        const shouldRetry =
          isConflictError(error) && attempt < MAX_UPDATE_ATTEMPTS;

        if (!shouldRetry) {
          throw error;
        }
      }
    }

    throw new Error(
      "The event image could not be saved after multiple attempts.",
    );
  },

  async getImage(eventId: string): Promise<EventImage | null> {
    try {
      const document = (await db.get(
        eventId,
      )) as unknown as EventDocumentWithAttachments;

      if (document.docType !== "clubEvent") {
        return null;
      }

      const attachment = document._attachments?.[EVENT_IMAGE_ATTACHMENT];

      if (!attachment) {
        return null;
      }

      const buffer = await db.attachment.get(eventId, EVENT_IMAGE_ATTACHMENT);

      return {
        buffer,
        contentType: attachment.content_type ?? "application/octet-stream",
      };
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  },

  async removeImage(eventId: string): Promise<ClubEvent | null> {
    for (let attempt = 1; attempt <= MAX_UPDATE_ATTEMPTS; attempt += 1) {
      try {
        const currentDocument = (await db.get(
          eventId,
        )) as unknown as EventDocumentWithAttachments;

        if (currentDocument.docType !== "clubEvent") {
          return null;
        }

        let refreshedDocument = currentDocument;

        if (currentDocument._attachments?.[EVENT_IMAGE_ATTACHMENT]) {
          await db.attachment.destroy(eventId, EVENT_IMAGE_ATTACHMENT, {
            rev: currentDocument._rev,
          });

          refreshedDocument = (await db.get(
            eventId,
          )) as unknown as EventDocumentWithAttachments;
        }

        const eventWithoutImage: EventDocumentWithAttachments = {
          ...refreshedDocument,
          imageUrl: undefined,
          ldt: new Date().toISOString(),
        };

        const response = await db.insert(eventWithoutImage);

        return {
          ...eventWithoutImage,
          _rev: response.rev,
        };
      } catch (error) {
        if (isNotFoundError(error)) {
          return null;
        }

        const shouldRetry =
          isConflictError(error) && attempt < MAX_UPDATE_ATTEMPTS;

        if (!shouldRetry) {
          throw error;
        }
      }
    }

    throw new Error(
      "The event image could not be removed after multiple attempts.",
    );
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
