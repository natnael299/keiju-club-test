import Nano from "nano";

import {
  COUCHDB_URL,
  COUCHDB_USERNAME,
  COUCHDB_PASSWORD,
  COUCHDB_DATABASE,
} from "./env.js";

if (!COUCHDB_URL) {
  throw new Error("COUCHDB_URL is missing from environment variables.");
}

if (!COUCHDB_USERNAME) {
  throw new Error("COUCHDB_USERNAME is missing from environment variables.");
}

if (!COUCHDB_PASSWORD) {
  throw new Error("COUCHDB_PASSWORD is missing from environment variables.");
}

if (!COUCHDB_DATABASE) {
  throw new Error("COUCHDB_DATABASE is missing from environment variables.");
}

export const couch = Nano(COUCHDB_URL);

export const databaseName = COUCHDB_DATABASE;

export async function authenticateCouchDb() {
  await couch.auth(COUCHDB_USERNAME, COUCHDB_PASSWORD);
}

export const db = couch.use(databaseName);
