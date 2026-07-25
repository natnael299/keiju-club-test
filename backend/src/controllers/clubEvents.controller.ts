import type { Request, Response } from "express";
import { clubEventsService } from "../services/clubEvents.service.js";
import type { EventAudience, EventCategory } from "../types/index.js";

type ClubEventParams = {
  eventId: string;
};

type ClubEventQuery = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
};

export const clubEventsController = {
  getAllClubEvents(
    req: Request<unknown, unknown, unknown, ClubEventQuery>,
    res: Response,
  ) {
    const events = clubEventsService.getAllClubEvents({
      city: req.query.city,
      category: req.query.category,
      audience: req.query.audience,
    });

    return res.json(events);
  },

  getClubEventById(req: Request<ClubEventParams>, res: Response) {
    const event = clubEventsService.getClubEventById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Club event not found" });
    }

    return res.json(event);
  },
};
