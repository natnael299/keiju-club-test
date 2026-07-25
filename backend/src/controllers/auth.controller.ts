import type { NextFunction, Request, Response } from "express";
import { loginAccount } from "../services/auth.service";

type LoginRequestBody = {
  email: string;
  password: string;
};

export const login = async (
  req: Request<unknown, unknown, LoginRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
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
};
