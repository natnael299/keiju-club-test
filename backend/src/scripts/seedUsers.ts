import "dotenv/config";

import bcrypt from "bcryptjs";

import { authenticateCouchDb, db } from "../config/couchdb.js";

import { mockUsers } from "../data/index.js";

import type { User } from "../types/index.js";

const TEST_PASSWORD = "password123";

async function seedUsers(): Promise<void> {
  try {
    preventProductionSeeding();

    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding demo users...");

    const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

    for (const mockUser of mockUsers) {
      const existingUser = await findUserById(mockUser._id);

      if (existingUser) {
        const updatedUser: User = {
          ...mockUser,

          _id: existingUser._id,
          _rev: existingUser._rev,

          email: mockUser.email.trim().toLowerCase(),

          passwordHash,

          cdt: existingUser.cdt ?? mockUser.cdt,

          ldt: new Date().toISOString(),
        };

        await db.insert(updatedUser);

        console.log(`Updated demo user: ${updatedUser.email}`);

        continue;
      }

      const newUser: User = {
        ...mockUser,

        email: mockUser.email.trim().toLowerCase(),

        passwordHash,

        ldt: new Date().toISOString(),
      };

      await db.insert(newUser);

      console.log(`Inserted demo user: ${newUser.email}`);
    }

    console.log("Demo user seed completed successfully.");

    console.log(`Demo password: ${TEST_PASSWORD}`);
  } catch (error) {
    console.error("Demo user seed failed:", error);

    process.exitCode = 1;
  }
}

function preventProductionSeeding(): void {
  const environment = process.env.NODE_ENV?.trim().toLowerCase();

  if (environment === "production") {
    throw new Error("Demo user seeding is disabled in production.");
  }
}

async function findUserById(userId: string): Promise<User | null> {
  try {
    const document = await db.get(userId);

    return document as unknown as User;
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

void seedUsers();
