import Nano from "nano";

import {
  COUCHDB_DATABASE,
  COUCHDB_PASSWORD,
  COUCHDB_URL,
  COUCHDB_USERNAME,
} from "./env.js";

function createAuthenticatedCouchDbUrl(): string {
  const url = new URL(COUCHDB_URL);

  url.username = COUCHDB_USERNAME;
  url.password = COUCHDB_PASSWORD;

  return url.toString();
}

export const couch = Nano({
  url: createAuthenticatedCouchDbUrl(),
});

export const databaseName = COUCHDB_DATABASE;

export const db = couch.use(databaseName);

export async function authenticateCouchDb(): Promise<void> {
  await couch.db.list();
}
