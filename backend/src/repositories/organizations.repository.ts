import { db } from "../config/couchdb.js";
import type { Organization } from "../types/index.js";

export const organizationsRepository = {
  async findAll(): Promise<Organization[]> {
    const result = await db.find({
      selector: {
        name: { $exists: true },
        phone: { $exists: true },
        address: { $exists: true },
      },
    });

    return result.docs as Organization[];
  },

  async findById(organizationId: string): Promise<Organization | null> {
    try {
      const document = await db.get(organizationId);

      return document as unknown as Organization;
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
