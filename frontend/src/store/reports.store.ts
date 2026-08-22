import { create } from "zustand";

import { reportsApi } from "@/services/reports.api";

import type { WeeklyReport } from "@/types";

type ReportsStore = {
  reports: WeeklyReport[];
  loading: boolean;
  error: string | null;

  fetchReports: () => Promise<void>;

  fetchOwnerReports: (ownerId: string) => Promise<void>;

  reset: () => void;
};

export const useReportsStore = create<ReportsStore>((set) => ({
  reports: [],
  loading: false,
  error: null,

  async fetchReports() {
    set({
      loading: true,
      error: null,
    });

    try {
      const reports = await reportsApi.getAll();

      set({
        reports,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("REPORT FETCH ERROR:", error);

      set({
        reports: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Reports could not be loaded.",
      });
    }
  },

  async fetchOwnerReports(ownerId) {
    set({
      loading: true,
      error: null,
    });

    try {
      const reports = await reportsApi.getByOwner(ownerId);

      set({
        reports,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("OWNER REPORT FETCH ERROR:", error);

      set({
        reports: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Reports could not be loaded.",
      });
    }
  },

  reset() {
    set({
      reports: [],
      loading: false,
      error: null,
    });
  },
}));
