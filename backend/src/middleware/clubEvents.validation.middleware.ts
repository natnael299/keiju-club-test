import type { NextFunction, Request, Response } from "express";

import { validateClubEventInput } from "../validation/clubEvents.validation.js";

export function validateCreateClubEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const result = validateClubEventInput(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      error: result.error,
      message: result.error,
    });

    return;
  }

  req.body = result.data;

  next();
}
