import type { NextFunction, Request, Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import { clubEventsService } from "../services/clubEvents.service.js";
import { eventImagesService } from "../services/eventImages.service.js";

import { toClientDoc } from "../utils/documents.js";

type EventImageParams = {
  eventId: string;
};

export const eventImagesController = {
  async uploadEventImage(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.authUser;

      if (!user) {
        res.status(401).json({
          success: false,
          error: "Authentication required.",
          message: "Authentication required.",
        });

        return;
      }

      if (user.role !== "organizationRep") {
        res.status(403).json({
          success: false,
          error: "Only organization representatives can upload event images.",
          message: "Only organization representatives can upload event images.",
        });

        return;
      }

      if (!user.organizationId) {
        res.status(403).json({
          success: false,
          error: "Organization is missing from this account.",
          message: "Organization is missing from this account.",
        });

        return;
      }

      const eventId = req.params.eventId as string;

      const event = await clubEventsService.getClubEventById(eventId);

      if (!event) {
        res.status(404).json({
          success: false,
          error: "Club event not found.",
          message: "Club event not found.",
        });

        return;
      }

      if (event.organizationId !== user.organizationId) {
        res.status(403).json({
          success: false,
          error: "You cannot change another organization's event image.",
          message: "You cannot change another organization's event image.",
        });

        return;
      }

      const image = req.file;

      if (!image) {
        res.status(400).json({
          success: false,
          error: "Select an event image.",
          message: "Select an event image.",
        });

        return;
      }

      if (!hasValidImageSignature(image.buffer, image.mimetype)) {
        res.status(400).json({
          success: false,
          error: "The uploaded file is not a valid JPG, PNG or WEBP image.",
          message: "The uploaded file is not a valid JPG, PNG or WEBP image.",
        });

        return;
      }

      const updatedEvent = await eventImagesService.saveEventImage(
        eventId,
        image.buffer,
        image.mimetype,
      );

      if (!updatedEvent) {
        res.status(404).json({
          success: false,
          error: "Club event not found.",
          message: "Club event not found.",
        });

        return;
      }

      res.status(200).json(toClientDoc(updatedEvent));
    } catch (error) {
      next(error);
    }
  },

  async getEventImage(
    req: Request<EventImageParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const image = await eventImagesService.getEventImage(req.params.eventId);

      if (!image) {
        res.status(404).json({
          success: false,
          error: "Event image not found.",
          message: "Event image not found.",
        });

        return;
      }

      res.setHeader("Content-Type", image.contentType);

      res.setHeader("Content-Length", image.buffer.length.toString());

      res.setHeader("Cache-Control", "public, max-age=3600");

      res.status(200).send(image.buffer);
    } catch (error) {
      next(error);
    }
  },
};

function hasValidImageSignature(buffer: Buffer, contentType: string): boolean {
  if (contentType === "image/jpeg") {
    return (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }

  if (contentType === "image/png") {
    const pngSignature = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);

    return (
      buffer.length >= pngSignature.length &&
      buffer.subarray(0, pngSignature.length).equals(pngSignature)
    );
  }

  if (contentType === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}
