import { db } from "../config/couchdb.js";
import type { RawNotification } from "../types/index.js";

export const notificationsRepository = {
  async findAll(): Promise<RawNotification[]> {
    const result = await db.find({
      selector: {
        type: "notif",
      },
    });

    return result.docs as RawNotification[];
  },

  async findByOwnerId(ownerId: string): Promise<RawNotification[]> {
    const result = await db.find({
      selector: {
        type: "notif",
        ownerId,
      },
    });

    return result.docs as RawNotification[];
  },

  async findById(notificationId: string): Promise<RawNotification | null> {
    try {
      const document = await db.get(notificationId);

      return document as unknown as RawNotification;
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
