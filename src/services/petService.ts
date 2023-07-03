import { Pet } from "../models/Pet";
import PetRepository from "../repositories/petRepository";

const petRepository = new PetRepository();

class PetService {
  async updatePet(petId: string, petData: Pet): Promise<Pet> {
    try {
      const pet = await petRepository.updatePet(petId, petData);
      if (!pet) {
        throw new Error("Pet not found");
      }
      return pet;
    } catch (error) {
      throw new Error("Failed to edit pet");
    }
  }

  async deletePet(petId: string): Promise<void> {
    try {
      await petRepository.deletePet(petId);
    } catch (error) {
      throw new Error("Failed to delete pet");
    }
  }
}

export default PetService;
