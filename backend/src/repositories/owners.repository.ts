import { db } from "../config/couchdb.js";
import type { Owner } from "../types/index.js";

export const ownersRepository = {
  async findAll(): Promise<Owner[]> {
    const result = await db.find({
      selector: {
        docType: "owner",
      },
    });

    return result.docs as Owner[];
  },

  async findById(ownerId: string): Promise<Owner | null> {
    try {
      const document = await db.get(ownerId);

      const owner = document as unknown as Owner;

      if (owner.docType !== "owner") {
        return null;
      }

      return owner;
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
