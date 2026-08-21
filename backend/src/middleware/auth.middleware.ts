import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import { usersRepository } from "../repositories/users.repository.js";

import type { UserRole } from "../types/index.js";

type JwtPayload = {
  userId: string;
  role: UserRole;
};

export type AuthenticatedRequest = Request & {
  authUser?: {
    id: string;
    role: UserRole;
    ownerIds?: string[];
    organizationId?: string;
  };
};

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Authentication required.",
      message: "Authentication required.",
    });

    return;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Authentication required.",
      message: "Authentication required.",
    });

    return;
  }

  let payload: JwtPayload;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!isValidJwtPayload(decodedToken)) {
      res.status(401).json({
        success: false,
        error: "Invalid or expired token.",
        message: "Invalid or expired token.",
      });

      return;
    }

    payload = decodedToken;
  } catch {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token.",
      message: "Invalid or expired token.",
    });

    return;
  }

  try {
    const user = await usersRepository.findById(payload.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        error: "User account was not found.",
        message: "User account was not found.",
      });

      return;
    }

    req.authUser = {
      id: user._id,
      role: user.role,
      ownerIds: user.ownerIds,
      organizationId: user.organizationId,
    };

    next();
  } catch (error) {
    next(error);
  }
}

function isValidJwtPayload(value: unknown): value is JwtPayload {
  if (
    typeof value !== "object" ||
    value === null ||
    !("userId" in value) ||
    !("role" in value)
  ) {
    return false;
  }

  const payload = value as {
    userId?: unknown;
    role?: unknown;
  };

  return (
    typeof payload.userId === "string" &&
    payload.userId.length > 0 &&
    (payload.role === "caretaker" || payload.role === "organizationRep")
  );
}
