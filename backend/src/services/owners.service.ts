import { ownersRepository } from "../repositories/owners.repository.js";

export const ownersService = {
  async getAllOwners() {
    return ownersRepository.findAll();
  },

  async getOwnerById(ownerId: string) {
    return ownersRepository.findById(ownerId);
  },
};
