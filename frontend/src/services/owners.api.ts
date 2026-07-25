import { api } from "./api";
import type { Owner } from "@/types";

export const ownersApi = {
  getAll() {
    return api<Owner[]>("/owners");
  },

  getById(ownerId: string) {
    return api<Owner>(`/owners/${ownerId}`);
  },
};
