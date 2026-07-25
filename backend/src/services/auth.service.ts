import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Organizer from "../models/organizer.model";

type AuthRole = "caretaker" | "nurse" | "organizer";

type AuthenticatedUser = {
  id: string;
  email: string;
  role: AuthRole;
  fullName?: string;
  organizationName?: string;
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

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+passwordHash");

  if (user) {
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

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
      },
    };
  }

  const organizer = await Organizer.findOne({
    email: normalizedEmail,
  }).select("+passwordHash");

  if (!organizer) {
    throw createServiceError("Invalid email or password.", 401);
  }

  const passwordMatches = await bcrypt.compare(
    password,
    organizer.passwordHash,
  );

  if (!passwordMatches) {
    throw createServiceError("Invalid email or password.", 401);
  }

  const token = createToken(organizer.id, "organizer");

  return {
    token,
    user: {
      id: organizer.id,
      email: organizer.email,
      role: "organizer",
      organizationName: organizer.organizationName,
    },
  };
};

const createToken = (userId: string, role: AuthRole): string => {
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
