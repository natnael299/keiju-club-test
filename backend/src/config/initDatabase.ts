import { authenticateCouchDb, couch, databaseName, db } from "./couchdb.js";

export async function initDatabase(): Promise<void> {
  await authenticateCouchDb();

  const databases = await couch.db.list();

  if (!databases.includes(databaseName)) {
    await couch.db.create(databaseName);

    console.log(`CouchDB database "${databaseName}" created.`);
  } else {
    console.log(`CouchDB database "${databaseName}" already exists.`);
  }

  await createDatabaseIndexes();

  console.log("CouchDB indexes are ready.");
}

async function createDatabaseIndexes(): Promise<void> {
  await Promise.all([
    db.createIndex({
      name: "documents-by-type",
      index: {
        fields: ["docType"],
      },
    }),

    db.createIndex({
      name: "users-by-email",
      index: {
        fields: ["docType", "email"],
      },
    }),

    db.createIndex({
      name: "events-by-organization",
      index: {
        fields: ["docType", "organizationId"],
      },
    }),

    db.createIndex({
      name: "notifications-by-owner",
      index: {
        fields: ["docType", "ownerId"],
      },
    }),

    db.createIndex({
      name: "reports-by-owner",
      index: {
        fields: ["docType", "ownerId"],
      },
    }),
  ]);
}
