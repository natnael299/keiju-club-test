import Nano from "nano";

const couchDbUrl = process.env.COUCHDB_URL;
const couchDbUsername = process.env.COUCHDB_USERNAME;
const couchDbPassword = process.env.COUCHDB_PASSWORD;
const couchDbDatabase = process.env.COUCHDB_DATABASE;

if (!couchDbUrl) {
  throw new Error("COUCHDB_URL is missing from environment variables.");
}

if (!couchDbUsername) {
  throw new Error("COUCHDB_USERNAME is missing from environment variables.");
}

if (!couchDbPassword) {
  throw new Error("COUCHDB_PASSWORD is missing from environment variables.");
}

if (!couchDbDatabase) {
  throw new Error("COUCHDB_DATABASE is missing from environment variables.");
}

export const couch = Nano(couchDbUrl);

export const databaseName = couchDbDatabase;

export const authenticateCouchDb = async () => {
  await couch.auth(couchDbUsername, couchDbPassword);
};

export const db = couch.use(databaseName);
