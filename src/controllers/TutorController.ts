
import { Request, Response } from "express";
import TutorService from "../services/tutorservice";
import { Tutor } from "../models/Tutor";

const tutorService = new TutorService();

 class TutorController {
  async getTutors(req: Request, res: Response): Promise<void> {
    try {
      const tutors: Tutor[] = await tutorService.getTutors();
      res.json(tutors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tutors" });
      console.log(error);
    }
  }

  async createTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorData: Tutor = req.body;
      const createdTutor: Tutor = await tutorService.createTutor(tutorData);
      res.json(createdTutor);
    } catch (error) {
      res.status(500).json( console.log );
    }
  }

  async updateTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorId: string = req.params.id;
      const tutorData: Tutor = req.body;
      const editedTutor: Tutor = await tutorService.updateTutor(
        tutorId,
        tutorData
      );
      res.json(editedTutor);
    } catch (error) {
      res.status(500).json({ error: "Failed to edit tutor" });
    }
  }

  async deleteTutor(req: Request, res: Response): Promise<void> {
    try {
      const tutorId: string = req.params.id;
      await tutorService.deleteTutor(tutorId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tutor" });
    }
  }
}

export default TutorController;




