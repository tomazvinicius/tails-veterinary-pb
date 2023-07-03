import PetModel, { Pet } from "../models/Pet";

class PetRepository {
  async createPet(petData: Pet): Promise<Pet> {
    try {
      const pet: Pet = await PetModel.create(petData);
      return pet;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create pet");
    }
  }

  async updatePet(petId: string, petData: Pet): Promise<Pet | null> {
    try {
      const pet: Pet | null = await PetModel.findByIdAndUpdate(petId, petData, {
        new: true,
      });
      return pet;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to edit pet");
    }
  }

  async deletePet(petId: string): Promise<void> {
    try {
      await PetModel.findByIdAndDelete(petId);
    } catch (error) {
      throw new Error("Failed to delete pet");
    }
  }
}

export default PetRepository;
