import type { NextFunction, Request, Response } from "express";

import multer from "multer";

const MAXIMUM_IMAGE_SIZE = 5 * 1024 * 1024;

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const imageParser = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAXIMUM_IMAGE_SIZE,
    files: 1,
  },

  fileFilter: (_req, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      callback(new Error("Only JPG, PNG and WEBP images are allowed."));

      return;
    }

    callback(null, true);
  },
}).single("image");

export function uploadEventImage(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  imageParser(req, res, (error: unknown) => {
    if (!error) {
      next();

      return;
    }

    let message = "The event image could not be uploaded.";

    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {
      message = "The event image must not exceed 5 MB.";
    } else if (error instanceof Error) {
      message = error.message;
    }

    res.status(400).json({
      success: false,
      error: message,
      message,
    });
  });
}
