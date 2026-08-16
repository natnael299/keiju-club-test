import type { Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import { ownersService } from "../services/owners.service.js";
import { toClientDoc } from "../utils/documents.js";

export const ownersController = {
  async getAllOwners(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "caretaker") {
        return res.status(403).json({
          error: "Only caretakers can access owner information",
        });
      }

      const allowedOwnerIds = user.ownerIds ?? [];

      const owners = await ownersService.getAllOwners();

      const allowedOwners = owners.filter((owner) =>
        allowedOwnerIds.includes(owner._id),
      );

      return res.json(allowedOwners.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch owners:", error);

      return res.status(500).json({
        error: "Failed to fetch owners",
      });
    }
  },

  async getOwnerById(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "caretaker") {
        return res.status(403).json({
          error: "Only caretakers can access owner information",
        });
      }

      const ownerId = req.params.ownerId as string;

      const allowed = user.ownerIds?.includes(ownerId);

      if (!allowed) {
        return res.status(403).json({
          error: "You do not have access to this owner",
        });
      }

      const owner = await ownersService.getOwnerById(ownerId);

      if (!owner) {
        return res.status(404).json({
          error: "Owner not found",
        });
      }

      return res.json(toClientDoc(owner));
    } catch (error) {
      console.error("Failed to fetch owner:", error);

      return res.status(500).json({
        error: "Failed to fetch owner",
      });
    }
  },
};
