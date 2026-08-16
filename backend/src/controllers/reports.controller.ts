import type { Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import { reportsService } from "../services/reports.service.js";
import { toClientDoc } from "../utils/documents.js";

export const reportsController = {
  async getAllReports(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.authUser;

      if (!user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }

      if (user.role !== "caretaker") {
        return res.status(403).json({
          error: "Only caretakers can access reports",
        });
      }

      const ownerId = req.query.ownerId as string | undefined;

      if (!ownerId) {
        return res.status(400).json({
          error: "ownerId is required",
        });
      }

      if (!user.ownerIds?.includes(ownerId)) {
        return res.status(403).json({
          error: "You do not have access to this owner's reports",
        });
      }

      const reports = await reportsService.getReportsByOwnerId(ownerId);

      const sortedReports = [...reports].sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );

      return res.json(sortedReports.map(toClientDoc));
    } catch (error) {
      console.error("Failed to fetch reports:", error);

      return res.status(500).json({
        error: "Failed to fetch reports",
      });
    }
  },
};
