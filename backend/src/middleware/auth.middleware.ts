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
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await usersRepository.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    req.authUser = {
      id: user._id,
      role: user.role,
      ownerIds: user.ownerIds,
      organizationId: user.organizationId,
    };

    next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}
