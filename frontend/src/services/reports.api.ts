import { api } from "./api";
import type { WeeklyReport } from "@/types";

export const reportsApi = {
  getAll() {
    return api<WeeklyReport[]>("/reports");
  },

  getByOwner(ownerId: string) {
    return api<WeeklyReport[]>(
      `/reports?ownerId=${encodeURIComponent(ownerId)}`,
    );
  },
};
