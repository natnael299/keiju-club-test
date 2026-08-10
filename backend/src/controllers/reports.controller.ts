import type { Request, Response } from "express";
import { mockReports } from "../data/mockReports.js";

export const reportsController = {
  getAllReports(req: Request, res: Response) {
    const ownerId =
      typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;

    const reports = ownerId
      ? mockReports.filter((report) => report.ownerId === ownerId)
      : mockReports;

    const sortedReports = [...reports].sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );

    return res.json(sortedReports);
  },
};
