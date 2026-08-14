import { organizationsRepository } from "../repositories/organizations.repository.js";

export const organizationsService = {
  async getAllOrganizations() {
    return organizationsRepository.findAll();
  },

  async getOrganizationById(organizationId: string) {
    return organizationsRepository.findById(organizationId);
  },
};
