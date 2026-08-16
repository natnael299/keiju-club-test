import { db } from "../config/couchdb.js";
import type { Organization } from "../types/index.js";

export const organizationsRepository = {
  async findAll(): Promise<Organization[]> {
    const result = await db.find({
      selector: {
        docType: "organization",
      },
    });

    return result.docs as Organization[];
  },

  async findById(organizationId: string): Promise<Organization | null> {
    try {
      const document = await db.get(organizationId);

      const organization = document as unknown as Organization;

      if (organization.docType !== "organization") {
        return null;
      }

      return organization;
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
