import { db } from "../config/couchdb.js";
import type { User } from "../types/index.js";

export const usersRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await db.find({
      selector: {
        docType: "user",
        email: normalizedEmail,
      },
      limit: 1,
    });

    const document = result.docs[0] as User | undefined;

    return document ?? null;
  },

  async findById(userId: string): Promise<User | null> {
    try {
      const document = await db.get(userId);

      const user = document as unknown as User;

      if (user.docType !== "user") {
        return null;
      }

      return user;
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  },
};

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 404
  );
}
