import type { Request, Response } from "express";
import { ownersService } from "../services/owners.service.js";
import { toClientDoc } from "../utils/documents.js";

type OwnerParams = {
  ownerId: string;
};

export const ownersController = {
  getAllOwners(_req: Request, res: Response) {
    const owners = ownersService.getAllOwners();
    res.json(owners.map(toClientDoc));
  },

  getOwnerById(req: Request<OwnerParams>, res: Response) {
    const owner = ownersService.getOwnerById(req.params.ownerId);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }
    return res.json(toClientDoc(owner));
  },
};
