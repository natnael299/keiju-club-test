import { db } from "../config/couchdb.js";
import type { Owner } from "../types/index.js";

export const ownersRepository = {
  async findAll(): Promise<Owner[]> {
    const result = await db.find({
      selector: {
        fullName: {
          $exists: true,
        },
        birthDate: {
          $exists: true,
        },
      },
    });

    return result.docs as Owner[];
  },

  async findById(ownerId: string): Promise<Owner | null> {
    try {
      const document = await db.get(ownerId);

      return document as unknown as Owner;
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  },
};

function isNotFoundError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  return "statusCode" in error && error.statusCode === 404;
}
