import type { Request, Response } from "express";

import { clubEventsService } from "../services/clubEvents.service.js";

import type { EventAudience, EventCategory } from "../types/index.js";

import { toClientDoc } from "../utils/documents.js";

type ClubEventParams = {
  eventId: string;
};

type ClubEventQuery = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
};

export const clubEventsController = {
  async getAllClubEvents(
    req: Request<unknown, unknown, unknown, ClubEventQuery>,
    res: Response,
  ) {
    try {
      const events = await clubEventsService.getAllClubEvents({
        city: req.query.city,
        category: req.query.category,
        audience: req.query.audience,
      });

      return res.json(events.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch club events:", error);

      return res.status(500).json({
        error: "Failed to fetch club events",
      });
    }
  },

  async getClubEventById(req: Request<ClubEventParams>, res: Response) {
    try {
      const event = await clubEventsService.getClubEventById(
        req.params.eventId,
      );

      if (!event) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      return res.json(toClientDoc(event));
    } catch (error) {
      console.error("Failed to fetch club event:", error);

      return res.status(500).json({
        error: "Failed to fetch club event",
      });
    }
  },
};
