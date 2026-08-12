import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { mockUsers } from "../data/index.js";
import type { UserRole } from "../types/index.js";

type AuthenticatedUser = {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;

  ownerIds?: string[];
  organizationId?: string;
};

type LoginResult = {
  token: string;
  user: AuthenticatedUser;
};

type ServiceError = Error & {
  statusCode?: number;
};

const createServiceError = (
  message: string,
  statusCode: number,
): ServiceError => {
  const error: ServiceError = new Error(message);

  error.statusCode = statusCode;

  return error;
};

export const loginAccount = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = mockUsers.find(
    (candidate) => candidate.email.toLowerCase() === normalizedEmail,
  );

  if (!user) {
    throw createServiceError("Invalid email or password.", 401);
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);

  if (!passwordMatches) {
    throw createServiceError("Invalid email or password.", 401);
  }

  const token = createToken(user.id, user.role);

  return {
    token,

    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,

      ownerIds: user.ownerIds,
      organizationId: user.organizationId,
    },
  };
};

const createToken = (userId: string, role: UserRole): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw createServiceError(
      "JWT_SECRET is missing from the environment variables.",
      500,
    );
  }

  return jwt.sign(
    {
      userId,
      role,
    },
    jwtSecret,
    {
      expiresIn: "7d",
    },
  );
};

const verifyPassword = async (
  rawPassword: string,
  storedHash: string,
): Promise<boolean> => {
  if (storedHash === "$2b$10$mock-password-hash") {
    return rawPassword === "password123";
  }

  return bcrypt.compare(rawPassword, storedHash);
};
