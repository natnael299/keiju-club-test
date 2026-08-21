import type { NextFunction, Request, Response } from "express";

import { loginAccount } from "../services/auth.service.js";

type LoginRequestBody = {
  email?: unknown;
  password?: unknown;
};

export async function login(
  req: Request<unknown, unknown, LoginRequestBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const password =
      typeof req.body.password === "string" ? req.body.password : "";

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Email and password are required.",
        message: "Email and password are required.",
      });

      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        success: false,
        error: "Enter a valid email address.",
        message: "Enter a valid email address.",
      });

      return;
    }

    if (email.length > 254 || password.length > 128) {
      res.status(400).json({
        success: false,
        error: "The submitted login information is too long.",
        message: "The submitted login information is too long.",
      });

      return;
    }

    const result = await loginAccount(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
