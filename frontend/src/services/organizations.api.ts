import { api } from "./api";
import type { Organization } from "@/types";

export const organizationsApi = {
  getById(organizationId: string) {
    return api<Organization>(`/organizations/${organizationId}`);
  },
};
