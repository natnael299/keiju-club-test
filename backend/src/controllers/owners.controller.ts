import type { Request, Response } from "express";
import { ownersService } from "../services/owners.service.js";
import { toClientDoc } from "../utils/documents.js";

type OwnerParams = {
  ownerId: string;
};

export const ownersController = {
  async getAllOwners(_req: Request, res: Response) {
    try {
      const owners = await ownersService.getAllOwners();

      return res.json(owners.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch owners:", error);

      return res.status(500).json({
        error: "Failed to fetch owners",
      });
    }
  },

  async getOwnerById(req: Request<OwnerParams>, res: Response) {
    try {
      const owner = await ownersService.getOwnerById(req.params.ownerId);

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
