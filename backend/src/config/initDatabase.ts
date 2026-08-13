import { authenticateCouchDb, couch, databaseName } from "./couchdb.js";

export async function initDatabase() {
  await authenticateCouchDb();

  const databases = await couch.db.list();

  if (!databases.includes(databaseName)) {
    await couch.db.create(databaseName);

    console.log(`CouchDB database "${databaseName}" created.`);
  } else {
    console.log(`CouchDB database "${databaseName}" already exists.`);
  }
}
