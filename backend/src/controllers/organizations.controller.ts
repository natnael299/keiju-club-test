import type { Request, Response } from "express";

import { organizationsService } from "../services/organizations.service.js";
import { toClientDoc } from "../utils/documents.js";

type OrganizationParams = {
  organizationId: string;
};

export const organizationsController = {
  async getAllOrganizations(_req: Request, res: Response) {
    try {
      const organizations = await organizationsService.getAllOrganizations();

      return res.json(organizations.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch organizations:", error);

      return res.status(500).json({
        error: "Failed to fetch organizations",
      });
    }
  },

  async getOrganizationById(req: Request<OrganizationParams>, res: Response) {
    try {
      const organization = await organizationsService.getOrganizationById(
        req.params.organizationId,
      );

      if (!organization) {
        return res.status(404).json({
          error: "Organization not found",
        });
      }

      return res.json(toClientDoc(organization));
    } catch (error) {
      console.error("Failed to fetch organization:", error);

      return res.status(500).json({
        error: "Failed to fetch organization",
      });
    }
  },
};
