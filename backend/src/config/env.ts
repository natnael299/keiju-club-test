import "dotenv/config";

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing from environment variables.`);
  }

  return value;
}

export const PORT = Number(process.env.PORT) || 3001;

export const JWT_SECRET = getEnv("JWT_SECRET");

export const COUCHDB_URL = getEnv("COUCHDB_URL");

export const COUCHDB_USERNAME = getEnv("COUCHDB_USERNAME");

export const COUCHDB_PASSWORD = getEnv("COUCHDB_PASSWORD");

export const COUCHDB_DATABASE = getEnv("COUCHDB_DATABASE");
