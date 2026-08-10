import { create } from "zustand";

import { reportsApi } from "@/services/reports.api";
import type { WeeklyReport } from "@/types";

type ReportsStore = {
  reports: WeeklyReport[];
  loading: boolean;

  fetchReports: () => Promise<void>;
  fetchOwnerReports: (ownerId: string) => Promise<void>;
};

export const useReportsStore = create<ReportsStore>((set) => ({
  reports: [],
  loading: false,

  async fetchReports() {
    set({ loading: true });

    try {
      const reports = await reportsApi.getAll();

      console.log("REPORTS FROM API:", reports);

      set({
        reports,
        loading: false,
      });
    } catch (error) {
      console.error("REPORT FETCH ERROR:", error);

      set({
        reports: [],
        loading: false,
      });
    }
  },

  async fetchOwnerReports(ownerId) {
    set({ loading: true });

    try {
      const reports = await reportsApi.getByOwner(ownerId);

      set({
        reports,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        reports: [],
        loading: false,
      });
    }
  },
}));
