import { Tutor } from "../models/Tutor";

import TutorRepository from "../repositories/tutorRepository";


const tutorRepository = new TutorRepository();


class TutorService {
  async getTutors(): Promise<Tutor[]> {
    try {
      const tutors: Tutor[] = await tutorRepository.getAllTutors();
      return tutors;
    } catch (error) {
      throw new Error("Failed to fetch tutors");
    }
  }

  async createTutor(tutorData: Tutor): Promise<Tutor> {
    try {
      const tutor: Tutor = await tutorRepository.createTutor(tutorData);
      return tutor;
    } catch (error) {
      throw new Error("Failed to create tutor");
    }
  }

  async updateTutor(tutorId: string, tutorData: Tutor): Promise<Tutor> {
    try {
      const tutor: Tutor | null = await tutorRepository.updateTutor(tutorId, tutorData);
      if (!tutor) {
        throw new Error("Tutor not found");
      }
      return tutor;
    } catch (error) {
      throw new Error("Failed to edit tutor");
    }
  }

  async deleteTutor(tutorId: string): Promise<void> {
    try {
      await tutorRepository.deleteTutor(tutorId);
    } catch (error) {
      throw new Error("Failed to delete tutor");
    }
  }

  async addPetToTutor(tutorId: string, petData: Pet): Promise<Pet> {
    try {
      const createdPet: Pet = await petRepository.createPet(petData);
      await tutorRepository.addPetToTutor(tutorId, createdPet._id.toString());
      return createdPet;
    } catch (error) {
      throw new Error("Failed to add pet to tutor");
    }
  }
}

export default TutorService;
