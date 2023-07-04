import PetModel, { Pet } from "../models/Pet";
import { Tutor } from "../models/Tutor";

class PetRepository {
  async createPet(petData: Pet): Promise<Pet> {
    try {
      const pet = await PetModel.create(petData);
      return pet;
    } catch (error) {
      throw new Error("Failed to create pet");
    }
  }

  async findById(tutorId: string, petId: string) {
    const pet = await PetModel.findOne({ _id: petId });
    return pet;
  }

  async deleteOne(tutorId: string, petId: string) {
    await PetModel.findOneAndDelete({ _id: petId, tutor: tutorId });
  }

  async findByTutorId(tutorId: string) {
    const pets = await PetModel.find({ tutor: tutorId });
    return pets;
  }

  async update(petData: Pet, petIndex: any, tutor: Tutor) {
    petData._id = tutor.pets[petIndex]._id;
    petData.__v = tutor.pets[petIndex].__v;
    const updatedPet = (tutor.pets[petIndex] = petData);
    await tutor.save();
    return updatedPet;
  }

  async delete(petIndex: any, tutor: Tutor) {
    tutor.pets.splice(petIndex, 1);
    await tutor.save();
    return;
  }
}

export default PetRepository;
