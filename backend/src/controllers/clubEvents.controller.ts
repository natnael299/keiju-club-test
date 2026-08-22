import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { clubEventsService } from "../services/clubEvents.service.js";

import type {
  EventAudience,
  EventCategory,
  RegistrationStatus,
} from "../types/index.js";

import { toClientDoc } from "../utils/documents.js";

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
  registrationUrl?: string;
  registrationStatus?: RegistrationStatus;

  categories: EventCategory[];
  audience: EventAudience;

  address: string;
  city: string;

  startsAt: string;
  endsAt: string;
};

type UpdateClubEventBody = Partial<CreateClubEventBody>;

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
      console.error("Failed to fetch Club events:", error);

      return res.status(500).json({
        error: "Failed to fetch Club events",
      });
    }
  },

  async getOrganizationClubEvents(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "organizationRep") {
        return res.status(403).json({
          error:
            "Only organization representatives can access organization events",
        });
      }

      if (!user.organizationId) {
        return res.status(403).json({
          error: "Organization is missing from this account",
        });
      }

      const events = await clubEventsService.getClubEventsByOrganizationId(
        user.organizationId,
      );

      return res.json(events.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch organization Club events:", error);

      return res.status(500).json({
        error: "Failed to fetch organization Club events",
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
      console.error("Failed to fetch Club event:", error);

      return res.status(500).json({
        error: "Failed to fetch Club event",
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
      console.error("Failed to create Club event:", error);

      return res.status(500).json({
        error: "Failed to create Club event",
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

      const updates = req.body as UpdateClubEventBody;

      const event = await clubEventsService.updateClubEvent(eventId, updates);

      if (!event) {
        return res.status(404).json({
          error: "Club event not found",
        });
      }

      return res.json(toClientDoc(event));
    } catch (error) {
      console.error("Failed to update Club event:", error);

      return res.status(500).json({
        error: "Failed to update Club event",
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
      console.error("Failed to delete Club event:", error);

      return res.status(500).json({
        error: "Failed to delete Club event",
      });
    }
  },
};
