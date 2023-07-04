import { Pet } from "../models/Pet";
import TutorModel, { Tutor } from "../models/Tutor";

class TutorRepository {
  async getAllTutors(): Promise<Tutor[]> {
    try {
      const tutors = await TutorModel.find();
      return tutors;
    } catch (error) {
      throw new Error("Failed to fetch tutors");
    }
  }

  async createTutor(tutorData: Tutor): Promise<Tutor> {
    try {
      const tutor = await TutorModel.create(tutorData);
      return tutor;
    } catch (error) {
      throw new Error("Failed to create tutor");
    }
  }

  async updateTutor(tutorId: string, tutorData: Tutor): Promise<Tutor | null> {
    try {
      const tutor = await TutorModel.findByIdAndUpdate(tutorId, tutorData, {
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
      return;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete tutor");
    }
  }

  async addPetToTutor(tutorId: string, petData: Pet): Promise<Tutor | null> {
    return TutorModel.findByIdAndUpdate(
      tutorId,
      { $push: { pets: petData } },
      { new: true }
    );
  }

  async verifyTutor(tutorId: string): Promise<any> {
    return TutorModel.findById(tutorId);
  }

  async findById(tutorId: string) {
    const tutor = await TutorModel.findOne({ _id: tutorId });
    return tutor;
  }

  async auth(email: string, password: string): Promise<any> {
    return TutorModel.findOne({ email: email, password: password });
  }
}

export default TutorRepository;
