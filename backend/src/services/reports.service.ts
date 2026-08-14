import { reportsRepository } from "../repositories/reports.repository.js";

export const reportsService = {
  async getAllReports() {
    return reportsRepository.findAll();
  },

  async getReportsByOwnerId(ownerId: string) {
    return reportsRepository.findByOwnerId(ownerId);
  },

  async getReportById(reportId: string) {
    return reportsRepository.findById(reportId);
  },
};
