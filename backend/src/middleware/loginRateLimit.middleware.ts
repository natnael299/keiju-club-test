import type { Request } from "express";

import { rateLimit } from "express-rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const loginRateLimit = rateLimit({
  windowMs: FIFTEEN_MINUTES,

  limit: 10,

  standardHeaders: true,

  legacyHeaders: false,

  skipSuccessfulRequests: true,

  keyGenerator: (req: Request): string => {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    return email || "unknown-login";
  },

  message: {
    success: false,
    error:
      "Too many failed login attempts. Please wait 15 minutes and try again.",
    message:
      "Too many failed login attempts. Please wait 15 minutes and try again.",
  },
});
