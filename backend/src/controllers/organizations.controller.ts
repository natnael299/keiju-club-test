import type { Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { organizationsService } from "../services/organizations.service.js";
import { toClientDoc } from "../utils/documents.js";

export const organizationsController = {
  async getOrganizationById(req: AuthenticatedRequest, res: Response) {
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
            "Only organization representatives can access organization details",
        });
      }

      const organizationId = req.params.organizationId as string;

      if (user.organizationId !== organizationId) {
        return res.status(403).json({
          error: "You do not have access to this organization",
        });
      }

      const organization =
        await organizationsService.getOrganizationById(organizationId);

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
