import "dotenv/config";
import bcrypt from "bcryptjs";

import { authenticateCouchDb, db } from "../config/couchdb.js";
import { mockUsers } from "../data/index.js";
import type { User } from "../types/index.js";

const TEST_PASSWORD = "password123";

async function seedUsers() {
  try {
    await authenticateCouchDb();

    console.log("Connected to CouchDB.");
    console.log("Seeding users...");

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

        console.log(`Updated user: ${updatedUser.email}`);
        continue;
      }

      const newUser: User = {
        ...mockUser,

        email: mockUser.email.trim().toLowerCase(),
        passwordHash,

        ldt: new Date().toISOString(),
      };

      await db.insert(newUser);

      console.log(`Inserted user: ${newUser.email}`);
    }

    console.log("User seed completed successfully.");
    console.log("Test password: password123");
  } catch (error) {
    console.error("User seed failed:", error);

    process.exitCode = 1;
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
