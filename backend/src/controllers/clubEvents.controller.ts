import type { Request, Response } from "express";
import { clubEventsService } from "../services/clubEvents.service.js";
import type { EventAudience, EventCategory } from "../types/index.js";
import { toClientDoc } from "../utils/documents.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

type ClubEventParams = {
  eventId: string;
};

type ClubEventQuery = {
  city?: string;
  category?: EventCategory;
  audience?: EventAudience;
};

type CreateClubEventBody = {
  title: string;
  description: string;
  imageUrl?: string;
  categories: EventCategory[];
  audience: EventAudience;
  address: string;
  city: string;
  startsAt: string;
  endsAt: string;
};

type UpdateClubEventBody = Partial<Omit<CreateClubEventBody, "organizationId">>;

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

  async createClubEvent(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "organizationRep") {
        return res.status(403).json({
          error: "Only organization representatives can create events",
        });
      }

      if (!user.organizationId) {
        return res.status(403).json({
          error: "Organization is missing from this account",
        });
      }

      const body = req.body as CreateClubEventBody;

      const event = await clubEventsService.createClubEvent({
        ...body,

        organizationId: user.organizationId,
      });

      return res.status(201).json(toClientDoc(event));
    } catch (error) {
      console.error("Failed to create club event:", error);

      return res.status(500).json({
        error: "Failed to create club event",
      });
    }
  },

  async updateClubEvent(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "organizationRep") {
        return res.status(403).json({
          error: "Only organization representatives can update events",
        });
      }

      if (!user.organizationId) {
        return res.status(403).json({
          error: "Organization is missing from this account",
        });
      }

      const eventId = req.params.eventId as string;

      const existingEvent = await clubEventsService.getClubEventById(eventId);

      if (!existingEvent) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      if (existingEvent.organizationId !== user.organizationId) {
        return res.status(403).json({
          error: "You cannot update another organization's event",
        });
      }

      const event = await clubEventsService.updateClubEvent(eventId, req.body);

      if (!event) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      return res.json(toClientDoc(event));
    } catch (error) {
      console.error("Failed to update club event:", error);

      return res.status(500).json({
        error: "Failed to update club event",
      });
    }
  },

  async deleteClubEvent(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "organizationRep") {
        return res.status(403).json({
          error: "Only organization representatives can delete events",
        });
      }

      if (!user.organizationId) {
        return res.status(403).json({
          error: "Organization is missing from this account",
        });
      }

      const eventId = req.params.eventId as string;

      const existingEvent = await clubEventsService.getClubEventById(eventId);

      if (!existingEvent) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      if (existingEvent.organizationId !== user.organizationId) {
        return res.status(403).json({
          error: "You cannot delete another organization's event",
        });
      }

      const deleted = await clubEventsService.deleteClubEvent(eventId);

      if (!deleted) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Failed to delete club event:", error);

      return res.status(500).json({
        error: "Failed to delete club event",
      });
    }
  },
};
