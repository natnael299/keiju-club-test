import "dotenv/config";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockOwners } from "../data/index.js";
import type { Owner } from "../types/index.js";

async function seedOwners() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding owners...");

    for (const mockOwner of mockOwners) {
      const existingOwner = await findDocumentById(mockOwner._id);

      if (existingOwner) {
        const updatedOwner: Owner = {
          ...mockOwner,

          _id: existingOwner._id,
          _rev: existingOwner._rev,

          docType: "owner",

          cdt: existingOwner.cdt ?? mockOwner.cdt,
          ldt: new Date().toISOString(),
        };

        await db.insert(updatedOwner);

        console.log(`Updated owner: ${updatedOwner.fullName}`);
        continue;
      }

      const newOwner: Owner = {
        ...mockOwner,

        docType: "owner",
        ldt: new Date().toISOString(),
      };

      await db.insert(newOwner);

      console.log(`Inserted owner: ${newOwner.fullName}`);
    }

    console.log("Owner seed completed successfully.");
  } catch (error) {
    console.error("Owner seed failed:", error);

    process.exitCode = 1;
  }
}

async function findDocumentById(documentId: string): Promise<Owner | null> {
  try {
    const document = await db.get(documentId);

    return document as unknown as Owner;
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

void seedOwners();
