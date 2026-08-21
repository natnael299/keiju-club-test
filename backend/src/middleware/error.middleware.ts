import type { NextFunction, Request, Response } from "express";

type HttpError = Error & {
  statusCode?: number;
  status?: number;
};

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: "Route not found",
    message: `Route ${req.method} ${req.originalUrl} does not exist.`,
  });
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const normalizedError = normalizeError(error);

  const statusCode =
    normalizedError.statusCode ?? normalizedError.status ?? 500;

  const safeStatusCode =
    statusCode >= 400 && statusCode < 600 ? statusCode : 500;

  if (safeStatusCode >= 500) {
    console.error("Unhandled API error:", normalizedError);
  }

  const message =
    safeStatusCode >= 500
      ? "An unexpected server error occurred."
      : normalizedError.message;

  res.status(safeStatusCode).json({
    success: false,
    error: message,
    message,
  });
}

function normalizeError(error: unknown): HttpError {
  if (error instanceof Error) {
    return error;
  }

  return new Error("An unknown server error occurred.");
}
