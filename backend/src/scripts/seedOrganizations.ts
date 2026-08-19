import "dotenv/config";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockOrganizations } from "../data/index.js";
import type { Organization } from "../types/index.js";

async function seedOrganizations() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding organizations...");

    for (const mockOrganization of mockOrganizations) {
      const existingDocument = await getOrganizationById(mockOrganization._id);

      if (existingDocument) {
        const updatedOrganization: Organization = {
          ...mockOrganization,

          _id: existingDocument._id,
          _rev: existingDocument._rev,

          docType: "organization",
          ldt: new Date().toISOString(),
        };

        await db.insert(updatedOrganization);

        console.log(`Updated organization: ${updatedOrganization.name}`);
      } else {
        const newOrganization: Organization = {
          ...mockOrganization,

          docType: "organization",
          ldt: new Date().toISOString(),
        };

        await db.insert(newOrganization);

        console.log(`Inserted organization: ${newOrganization.name}`);
      }
    }

    console.log("Organization seed completed successfully.");
  } catch (error) {
    console.error("Organization seed failed:", error);

    process.exitCode = 1;
  }
}

async function getOrganizationById(
  organizationId: string,
): Promise<Organization | null> {
  try {
    const document = await db.get(organizationId);

    return document as unknown as Organization;
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

void seedOrganizations();
