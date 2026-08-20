import Nano from "nano";

import {
  COUCHDB_DATABASE,
  COUCHDB_PASSWORD,
  COUCHDB_URL,
  COUCHDB_USERNAME,
} from "./env.js";

export const couch = Nano(COUCHDB_URL);

export const databaseName = COUCHDB_DATABASE;

export const db = couch.use(databaseName);

export async function authenticateCouchDb() {
  await couch.auth(COUCHDB_USERNAME, COUCHDB_PASSWORD);
}
