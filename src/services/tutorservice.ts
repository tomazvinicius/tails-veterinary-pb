import { Tutor } from "../models/Tutor";
import { Pet } from "../models/Pet";
import TutorRepository from "../repositories/tutorRepository";
import PetRepository from "../repositories/petRepository";
const tutorRepository = new TutorRepository();
const petRepository = new PetRepository();
import { NotFoundError } from "../errors";

class TutorService {
  async getAllTutors(): Promise<Tutor[]> {
    try {
      const tutors = await tutorRepository.getAllTutors();
      return tutors;
    } catch (error) {
      throw new Error("Failed to fetch tutors");
    }
  }

  async createTutor(tutorData: Tutor): Promise<Tutor> {
    try {
      const tutor = await tutorRepository.createTutor(tutorData);
      return tutor;
    } catch (error) {
      throw new Error("Failed to create tutor");
    }
  }

  async updateTutor(tutorId: string, tutorData: Tutor): Promise<Tutor> {
    try {
      const tutor = await tutorRepository.updateTutor(tutorId, tutorData);
      if (!tutor) {
        throw new NotFoundError("Tutor not found");
      }
      return tutor;
    } catch (error) {
      throw new Error("Failed to edit tutor");
    }
  }

  async deleteTutor(tutorId: string): Promise<void> {
    try {
      const existingTutor = await tutorRepository.findById(tutorId);
      if (existingTutor?.pets && existingTutor?.pets.length !== 0) {
        throw new Error(
          `It is not possible to delete a tutor with referenced pet`
        );
      }
      await tutorRepository.deleteTutor(tutorId);
      return;
    } catch (error) {
      throw new Error("Failed to delete tutor");
    }
  }

  async addPetToTutor(tutorId: string, petData: Pet): Promise<Pet> {
    const createdPet: Pet = await petRepository.createPet(petData);
    await tutorRepository.addPetToTutor(tutorId, createdPet);
    return createdPet;
  }

  async verifyTutor(tutorId: string): Promise<any> {
    const index = await tutorRepository.verifyTutor(tutorId);
    if (!index) {
      throw new NotFoundError(`Tutor not found`);
    }
    return;
  }

  async auth(email: string, password: string): Promise<any> {
    return await tutorRepository.auth(email, password);
  }
}

export default TutorService;
