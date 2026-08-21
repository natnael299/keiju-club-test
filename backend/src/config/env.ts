import "dotenv/config";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is missing from environment variables.`);
  }

  return value;
}

function getPort(): number {
  const port = Number(process.env.PORT ?? 3001);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error("PORT must be a valid port number.");
  }

  return port;
}

export const PORT = getPort();

export const JWT_SECRET = getRequiredEnv("JWT_SECRET");

export const COUCHDB_URL = getRequiredEnv("COUCHDB_URL");

export const COUCHDB_USERNAME = getRequiredEnv("COUCHDB_USERNAME");

export const COUCHDB_PASSWORD = getRequiredEnv("COUCHDB_PASSWORD");

export const COUCHDB_DATABASE = getRequiredEnv("COUCHDB_DATABASE");
