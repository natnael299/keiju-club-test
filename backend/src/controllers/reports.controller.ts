import type { Request, Response } from "express";

import { reportsService } from "../services/reports.service.js";
import { toClientDoc } from "../utils/documents.js";

type ReportsQuery = {
  ownerId?: string;
};

export const reportsController = {
  async getAllReports(
    req: Request<unknown, unknown, unknown, ReportsQuery>,
    res: Response,
  ) {
    try {
      const reports = req.query.ownerId
        ? await reportsService.getReportsByOwnerId(req.query.ownerId)
        : await reportsService.getAllReports();

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
