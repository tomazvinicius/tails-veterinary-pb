import { Pet } from "../models/Pet";
import PetRepository from "../repositories/petRepository";
import TutorRepository from "../repositories/tutorRepository";
const petRepository = new PetRepository();
const tutorRepository = new TutorRepository();

class PetService {
  async updatePet(petData: Pet, petId: string, tutorId: string) {
    const existingTutor = await tutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new Error("Tutor not found");
    }

    const petIndex = existingTutor.pets.findIndex(
      (pet) => pet._id.toString() === petId
    );

    if (petIndex === -1) {
      throw new Error("Pet not found");
    }

    const updatePet: any = await petRepository.update(
      petData,
      petIndex.toString(),
      existingTutor,
      petId
    );
    return updatePet;
  }

  async deletePet(tutorId: string, petId: string) {
    const existingTutor = await tutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new Error("Tutor not found");
    }

    const petIndex = existingTutor.pets.findIndex(
      (pet) => pet._id.toString() === petId
    );

    if (petIndex === -1) {
      throw new Error("Pet not found");
    }

    await petRepository.delete(petIndex.toString(), existingTutor, petId);
    return;
  }
}

export default PetService;
