import TutorModel, { Tutor } from "../models/Tutor";

class TutorRepository {

    async createTutor(tutorData: Tutor): Promise<Tutor> {
        try {
          const tutor: Tutor = await TutorModel.create(tutorData);
          return tutor;
        } catch (error) {
          throw new Error("Failed to create tutor");
        }
      }
      async updateTutor(tutorId: string, tutorData: Tutor): Promise<Tutor | null> {
        try {
          const tutor: Tutor | null = await TutorModel.findByIdAndUpdate(tutorId, tutorData, {
            new: true,
          });
          return tutor;
        } catch (error) {
          throw new Error("Failed to edit tutor");
        }
      }

      
  async deleteTutor(tutorId: string): Promise<void> {
    try {
      await TutorModel.findByIdAndDelete(tutorId);
    } catch (error) {
      throw new Error("Failed to delete tutor");
    }
  }
    
  async getAllTutors(): Promise<Tutor[]> {
    try {
      const tutors: Tutor[] = await TutorModel.find();
      return tutors;
    } catch (error) {
      throw new Error("Failed to fetch tutors");
    }
  }

  async addPetToTutor(tutorId: string, petId: string): Promise<Tutor | null> {
    try {
      const tutor: Tutor | null = await TutorModel.findByIdAndUpdate(
        tutorId,
        { $push: { pets: petId } },
        { new: true }
      );
      return tutor;
    } catch (error) {
      throw new Error("Failed to add pet to tutor");
    }
  }
}

export default TutorRepository;
